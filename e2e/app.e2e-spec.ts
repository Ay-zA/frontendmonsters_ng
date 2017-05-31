import { FrontendmonstersPage } from './app.po';

describe('frontendmonsters App', () => {
  let page: FrontendmonstersPage;

  beforeEach(() => {
    page = new FrontendmonstersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hg works!');
  });
});
