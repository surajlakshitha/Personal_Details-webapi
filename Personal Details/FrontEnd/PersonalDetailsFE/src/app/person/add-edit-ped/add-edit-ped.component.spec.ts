import {async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPedComponent } from './add-edit-ped.component';

describe('AddEditPedComponent', () => {
  let component: AddEditPedComponent;
  let fixture: ComponentFixture<AddEditPedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
