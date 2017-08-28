import { ConsumeHttpServicesPage } from './app.po';

describe('consume-http-services App', () => {
  let page: ConsumeHttpServicesPage;

  beforeEach(() => {
    page = new ConsumeHttpServicesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
