import {Component, OnInit, ViewChild} from '@angular/core';
import {SlidebarComponent} from '../slidebar/slidebar.component';
import {DatePipe, NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {InventoryService} from '../../service/inventory.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-inventory',
  standalone: true,
  imports: [
    SlidebarComponent,
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatHeaderCellDef,
    NgForOf,
    FormsModule
  ],
  templateUrl: './search-inventory.component.html',
  styleUrl: './search-inventory.component.css'
})
export class SearchInventoryComponent implements OnInit {
  displayedColumns: string[] = ['itemName', 'itemType', 'price', 'expiryDate'];
  dataSource= new MatTableDataSource<any>([]);
  currentPage = 0;
  isLoading = false;
  hasMoreData = true;
  totalInventories = 0;
  perPage = 10;
  itemTypes = ['TV', 'Fridge', 'Washing Machine','LapTop'];
  brands = ['Samsung', 'LG', 'Sony', 'Innovex', 'Panasonic'];
  searchInputs = {
    itemName: '',
    itemType: '',

    brands: [] as string[]
  };

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.searchInventory(this.currentPage);
  }

  searchInventory(page:number) {
    this.isLoading = true;
    const inputs:any ={
      page:page,
      itemName:this.searchInputs.itemName,
      itemType:this.searchInputs.itemType,
    }
    if (this.searchInputs.brands && this.searchInputs.brands.length > 0) {
      this.searchInputs.brands.forEach((brand, index) => {
        inputs[`brands[${index}]`] = brand;
      });
    }
    console.log('Search Criteria:', inputs);
    this.inventoryService.searchInventory(inputs).subscribe(
      (response: any) => {
        console.log(response)
        const { inventoryDTOS, dataCount } = response;
        this.dataSource.data = inventoryDTOS;
        this.totalInventories = dataCount;

        // Check if more data exists
        this.hasMoreData = (page + 1) * this.perPage < dataCount;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching inventory:', error);
        this.isLoading = false;
      }
    );
  }

  nextPage() {
    if (this.hasMoreData && !this.isLoading) {
      this.currentPage++;
      this.searchInventory(this.currentPage);
    }
  }

  prevPage() {
    this.currentPage--;
    this.searchInventory(this.currentPage);

  }



}
