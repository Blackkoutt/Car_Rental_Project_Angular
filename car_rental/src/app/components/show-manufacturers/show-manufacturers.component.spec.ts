import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowManufacturersComponent } from './show-manufacturers.component';

describe('ShowManufacturersComponent', () => {
  let component: ShowManufacturersComponent;
  let fixture: ComponentFixture<ShowManufacturersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowManufacturersComponent]
    });
    fixture = TestBed.createComponent(ShowManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
