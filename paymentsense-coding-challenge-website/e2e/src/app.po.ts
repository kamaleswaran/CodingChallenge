import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getCountryCountForPageOne() {
    return element.all(by.css('.countries table tr')).count() as Promise<number>;
  }

  goToNextPage() {
    return element
  }
}
