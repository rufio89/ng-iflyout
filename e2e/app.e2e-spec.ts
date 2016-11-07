import { IflyoutPage } from './app.po';

describe('iflyout App', function() {
  let page: IflyoutPage;

  beforeEach(() => {
    page = new IflyoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
