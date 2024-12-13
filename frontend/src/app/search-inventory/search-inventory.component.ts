import {Component, OnInit} from '@angular/core';
import {SlidebarComponent} from '../slidebar/slidebar.component';
import {DatePipe, NgForOf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
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
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {InventoryService} from '../../service/inventory.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {EdtInventoryComponent} from '../edt-inventory/edt-inventory.component';
import {MatDialog} from '@angular/material/dialog';

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
    FormsModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './search-inventory.component.html',
  styleUrl: './search-inventory.component.css'
})
export class SearchInventoryComponent implements OnInit{
  displayedColumns: string[] = ['no','itemName', 'itemType','brands', 'price', 'expiryDate','actions'];
  dataSource= new MatTableDataSource<any>([]);
  currentPage = 1;
  isLoading = false;
  hasMoreData = false;
  totalInventories = 0;
  perPage = 10;
  itemTypes = ['TV', 'Fridge', 'Washing Machine','LapTop'];
  brands = ['Samsung', 'LG', 'Sony', 'Innovex', 'Panasonic'];
  searchInputs = {
    itemName: '',
    itemType: '',
    brands: [] as string[]
  };
  private inventoryId: any;



  ngOnInit() {
    this.fetchInventory(this.currentPage);
  }

  constructor(private inventoryService: InventoryService,private dialog:MatDialog,) {
  }

  searchInventory(page:number) {
    this.isLoading = true;
    const inputs:any ={
      page:page,
      itemName:this.searchInputs.itemName,
      itemType:this.searchInputs.itemType,
      brands: [] as string[]
    }
    if (this.searchInputs.brands && this.searchInputs.brands.length > 0) {
      this.searchInputs.brands.forEach((brand) => {
        inputs.brands.push(brand);
      });
    }
    console.log('Search Criteria:', inputs);
    this.inventoryService.searchInventory(inputs).subscribe(
      (response: any) => {
        console.log("response",response)

        this.dataSource.data = response.data;

        const totalLoadedItems = ((this.currentPage-1) * this.perPage) + response.data.length;
        console.log("totalLoad",totalLoadedItems);
        console.log(response.data.length);
        this.hasMoreData = totalLoadedItems < response.data.length;
        console.log(this.hasMoreData)
        this.isLoading = false;
        if(totalLoadedItems==10){
          this.hasMoreData = true;
        }


      },
      (error) => {
        console.error('Error fetching inventory:', error);
        this.isLoading = false;
      }
    );
  }
  fetchInventory(page:number) {
    this.inventoryService.getInventory(page).subscribe(
      (data)=>{
        const { dataCount } = data;
        this.totalInventories = dataCount;
      }
    )
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
  clear() {
    this.dataSource=new MatTableDataSource<any>([]);
    this.searchInputs.itemName = '';
    this.searchInputs.itemType = '';
    this.searchInputs.brands = [];
    location.reload();

  }
  handleEdit(element:any) {
    element.expireDate = this.formatDateForInput(element.expireDate);
    const dialogRef = this.dialog.open(EdtInventoryComponent, {
      width: '500px',
      data: element,
    });
    console.log(element);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        console.log("result",result);
        this.inventoryService.updateInventory(element.inventoryId,result).subscribe(
          (response: any) => {
            if(response.message=="success"){
              alert("Item updated successfully:")
              this.searchInventory(this.currentPage);
            }

          }
        )
      }
    })
  }
  handleDelete(id: any) {
    this.inventoryId = id;
    console.log(this.inventoryId);
    this.inventoryService.deleteInventory(id).subscribe(
      (response: any) => {
        if(response.code === 200){
          alert("Successfully deleted");
          this.searchInventory(this.currentPage);

        }
      }
    )

  }
  private formatDateForInput(expireDate: any) {
    if (!expireDate) return ''; // Handle empty values
    const date = new Date(expireDate);
    return date.toISOString().split('T')[0];
  }
}
