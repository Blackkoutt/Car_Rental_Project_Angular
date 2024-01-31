import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufacturerComponent } from './add-manufacturer.component';

describe('AddManufacturerComponent', () => {
  let component: AddManufacturerComponent;
  let fixture: ComponentFixture<AddManufacturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddManufacturerComponent]
    });
    fixture = TestBed.createComponent(AddManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
