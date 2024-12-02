import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {InventoryService} from '../../service/inventory.service';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent {

  constructor(private addInventoryService: InventoryService) {}


  itemType = '';
  itemName = '';
  brand ='';
  itemDescription = '';
  price = 0;
  expireDate = new Date();
  isVisible=false;
  isNotApplicable: boolean = false;

  submitForm() {
    const inventoryItem = {
      itemType: this.itemType,
      itemName: this.itemName,
      itemDescription: this.itemDescription,
      brand: this.brand,
      price: this.price,
      expireDate: this.isNotApplicable ? null : this.expireDate,
    };
    console.log('Inventory Item:', inventoryItem);

    this.addInventoryService.addInventory(inventoryItem).subscribe(
      (response) => {
        console.log('Add Inventory success:', response);
        if (response.code === 200) {
          alert(response.message);
          location.reload();
          this.closePopup();
        } else {
          alert('Registration failed');
        }
      },
      (error) => {
        // if(error.error.data==="Username has already taken"){
        //   alert('Username already taken');
        // }else if(error.error.data==="Email has already Taken"){
        //   alert('Email already taken');
        //
        // }
        // console.error('Registration error:', error);

      }
    );

    alert('Inventory item saved successfully!');
    this.closePopup();

  }

  closePopup() {
    this.isVisible = false;
    this.resetForm();
  }

  showPopup() {
    this.isVisible = true;
  }

  protected resetForm() {
    this.itemType = '';
    this.itemName = '';
    this.itemDescription = '';
    this.brand = '';
    this.price = 0;
    this.expireDate = new Date();
    this.isNotApplicable = false;
  }

}
