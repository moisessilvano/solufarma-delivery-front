import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoboyComponent } from './motoboy.component';

describe('MotoboyComponent', () => {
  let component: MotoboyComponent;
  let fixture: ComponentFixture<MotoboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
