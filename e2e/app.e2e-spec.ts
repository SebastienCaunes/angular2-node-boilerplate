import { Angular2NodeBoilerplatePage } from './app.po';

describe('angular2-node-boilerplate App', function() {
  let page: Angular2NodeBoilerplatePage;

  beforeEach(() => {
    page = new Angular2NodeBoilerplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
