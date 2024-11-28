import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInventoryComponent } from './search-inventory.component';

describe('SearchInventoryComponent', () => {
  let component: SearchInventoryComponent;
  let fixture: ComponentFixture<SearchInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
