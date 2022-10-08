import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPedComponent } from './show-ped.component';

describe('ShowPedComponent', () => {
  let component: ShowPedComponent;
  let fixture: ComponentFixture<ShowPedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
