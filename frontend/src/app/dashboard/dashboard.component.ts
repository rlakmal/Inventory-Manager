import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SlidebarComponent} from '../slidebar/slidebar.component';
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {InventoryService} from '../../service/inventory.service';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AddInventoryComponent} from '../add-inventory/add-inventory.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SlidebarComponent,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatPaginatorModule,
    AddInventoryComponent,
    DatePipe

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['itemName', 'itemType', 'price', 'expiryDate'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource= new MatTableDataSource<any>([]);
  currentPage = 0;
  isLoading = false;
  hasMoreData = true;
  totalInventories = 0;
  perPage = 10;

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.fetchInventory(this.currentPage);
  }
  @ViewChild('popup') popup!: AddInventoryComponent;

  openPopup() {
    console.log("popup clicked");
    this.popup.showPopup();
  }

  fetchInventory(page:number) {
    this.isLoading = true;
    this.inventoryService.getInventory(page).subscribe(
      (data)=>{
        const { inventoryDTOS, dataCount } = data;
        this.dataSource.data = inventoryDTOS;
        this.totalInventories = dataCount;
        const totalLoadedItems = (this.currentPage * this.perPage) + inventoryDTOS.length;
        console.log(totalLoadedItems);
        this.hasMoreData = totalLoadedItems < this.totalInventories;
        this.isLoading = false;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  nextPage() {
    if (this.hasMoreData && !this.isLoading) {
      this.currentPage++;
      this.fetchInventory(this.currentPage);
    }
  }

  prevPage() {
    this.currentPage--;
    this.fetchInventory(this.currentPage);

  }
}

