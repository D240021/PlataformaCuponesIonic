import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisCuponesPage } from './mis-cupones.page';

describe('MisCuponesPage', () => {
  let component: MisCuponesPage;
  let fixture: ComponentFixture<MisCuponesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCuponesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
