const gulp = require('gulp');
const del = require('del');
const args = require('yargs').argv;
const browserSync = require('browser-sync');
const $gulp = require('gulp-load-plugins')({
  lazy: true
});

const serverFiles = ['./src/server/**/*.js'];
const port = 3000;

// Help functions
const startBrowserSync = function() {
  // message(`[gulp]: Starting browserSync...`);

  const files = ['./dist/*.js', './dist/server/**/*.js'];

  if (browserSync.active || args.nosync) {
    return;
  }

  const browserSyncOption = {
    proxy: `localhost:${port}`,
    port: 8080,
    files,
    online: false,
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,

    // logLevel: 'debug',
    logPrefix: 'bs',
    notify: true,
    reloadDelay: 100
  };

  // message(`[bs]: Starting browserSync on port 8080...`);
  browserSync(browserSyncOption);
};

const log = function(item, msg, isErr) {
  if (isErr) {
    $gulp.util.log($gulp.util.colors.red.bold(msg[item]));
  } else {
    $gulp.util.log($gulp.util.colors.blue.bold(msg[item]));
  }
};

const message = function(msg, isErr) {
  if (typeof msg === 'object') {
    for (const item in msg) {
      if (msg.hasOwnProperty(item)) {
        log(item, msg, isErr);
      }
    }
  } else if (isErr) {
    $gulp.util.log($gulp.util.colors.red.bold(msg));
  } else {
    $gulp.util.log($gulp.util.colors.blue.bold(msg));
  }
};

const build = function() {
  // message('[gulp]: Buildig App...');

  return gulp
    .src(serverFiles)
    .pipe($gulp.babel({
      presets: ['es2015']
    }))
    .pipe($gulp.changed('./dist/server'))
    .pipe(gulp.dest('./dist/server'));
};

gulp.task('help', $gulp.taskListing);

gulp.task('clean', () => {
  // message('[gulp]: Cleaning up...');
  const cleaningFiles = './dist/server/';

  return del(cleaningFiles);
});

gulp.task('lint', () => {
  // message('[gulp]: Analysing Javascripts with JSHint and JSCS');

  return gulp
    .src(serverFiles)
    .pipe($gulp.if(args.showfiles, $gulp.print(filepath => {
      message(filepath);
    })))
    .pipe($gulp.jscs())
    .pipe($gulp.jshint())
    .pipe($gulp.jshint.reporter('jshint-stylish', {
      verbos: true
    }))
    .pipe($gulp.jshint.reporter('fail'));
});

// OPT:can Add lint task
gulp.task('build', gulp.parallel(build));

gulp.task('serve', gulp.series(build, () => {
  const isBuild = args.build;

  // message(`[gulp]: Serving in ${isBuild ?  'PROD' : 'DEV'} mode`);

  const nodemonOption = {
    script: './dist/server/bin/www.js',
    delayTime: 1,
    env: {
      PORT: port,
      NODE_ENV: isBuild ? 'prod' : 'dev'
    },
    tasks: 'build',
    watch: './src/server/',
    ext: 'js'
  };
  let started = false;

  return $gulp.nodemon(nodemonOption)
    .on('change', ev => {
      console.warn('CHANGE');
    })
    .on('start', ev => {
      message('[nodemon]: Server Started.');
      if (! started) {
        startBrowserSync();
        started = true;
      }
    })
    .on('restart', ev => {
      message(`[nodemon]: Files Changed: ${ev}`);
      message('[nodemon]: Server Restarted');
      setTimeout(() => {
        browserSync.notify('[bs]: Reloading browserSync');
        browserSync.reload({
          stream: true
        });
      }, 1000);
    })
    .on('crash', ev => {
      message('[nodemon]: Server Chrashed!', true);
      browserSync.notify('[bs]: Stop BS due crashes');
      browserSync.exit();
    })
    .on('exit', ev => {
      message('[nodemon]: Server Shutdowned.');
    });
}));

// View Engine
gulp.task('styles', function() {
  // message('Styling..');
  return gulp.src('./.temp/**/*.scss')
    .pipe($gulp.sass().on('error', $gulp.sass.logError))
    .pipe(gulp.dest('./.temp/css/'));
});

gulp.task('default', gulp.series('serve'));
