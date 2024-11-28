import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtInventoryComponent } from './edt-inventory.component';

describe('EdtInventoryComponent', () => {
  let component: EdtInventoryComponent;
  let fixture: ComponentFixture<EdtInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdtInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
