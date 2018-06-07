import { ApartmentModule } from './apartment.module';

describe('ApartmentModule', () => {
  let apartmentModule: ApartmentModule;

  beforeEach(() => {
    apartmentModule = new ApartmentModule();
  });

  it('should create an instance', () => {
    expect(apartmentModule).toBeTruthy();
  });
});
