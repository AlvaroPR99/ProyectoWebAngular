import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSamsungComponent } from './catalogo-samsung.component';

describe('CatalogoSamsungComponent', () => {
  let component: CatalogoSamsungComponent;
  let fixture: ComponentFixture<CatalogoSamsungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoSamsungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoSamsungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
