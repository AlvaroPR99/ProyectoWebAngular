import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAppleComponent } from './catalogo-apple.component';

describe('CatalogoAppleComponent', () => {
  let component: CatalogoAppleComponent;
  let fixture: ComponentFixture<CatalogoAppleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoAppleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoAppleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
