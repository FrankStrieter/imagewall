import { ImagewallPage } from './app.po';

describe('imagewall App', () => {
  let page: ImagewallPage;

  beforeEach(() => {
    page = new ImagewallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
