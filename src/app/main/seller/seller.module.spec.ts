import { SellerModule } from './seller.module';

describe('SellerModule', () => {
  let sellerModule: SellerModule;

  beforeEach(() => {
    sellerModule = new SellerModule();
  });

  it('should create an instance', () => {
    expect(sellerModule).toBeTruthy();
  });
});
