import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatelinkComponent } from './modal-createlink.component';

describe('ModalCreatelinkComponent', () => {
  let component: ModalCreatelinkComponent;
  let fixture: ComponentFixture<ModalCreatelinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreatelinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatelinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
