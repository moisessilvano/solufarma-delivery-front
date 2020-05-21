import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryModalComponent } from './edit-delivery-modal.component';

describe('EditDeliveryModalComponent', () => {
  let component: EditDeliveryModalComponent;
  let fixture: ComponentFixture<EditDeliveryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
