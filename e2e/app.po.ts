import { browser, by, element } from 'protractor';

export class FrontendmonstersPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hg-root h1')).getText();
  }
}
