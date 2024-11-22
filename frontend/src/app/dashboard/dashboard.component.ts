import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SlidebarComponent} from '../slidebar/slidebar.component';
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
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
    AddInventoryComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['itemName', 'itemType', 'price', 'expiryDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild('popup') popup!: AddInventoryComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openPopup() {
    console.log("popup clicked");
    this.popup.showPopup();
  }
}
export interface PeriodicElement {
  itemName: string;
  itemType: string;
  price: number;
  expiryDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},
  {itemName: 'Tv', itemType: 'LG', price: 25000.00, expiryDate: 'H'},

];
