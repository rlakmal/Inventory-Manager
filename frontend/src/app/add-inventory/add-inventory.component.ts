import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

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
  itemType = '';
  itemName = '';
  brand ='';
  description = '';
  price = 0;
  expireDate = new Date();
  isVisible=false;
  isNotApplicable: boolean = false;

  submitForm() {
    const inventoryItem = {
      itemType: this.itemType,
      itemName: this.itemName,
      description: this.description,
      brand: this.brand,
      price: this.price,
      expireDate: this.isNotApplicable ? null : this.expireDate,
    };

    console.log('Inventory Item:', inventoryItem);

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
    this.description = '';
    this.brand = '';
    this.price = 0;
    this.expireDate = new Date();
    this.isNotApplicable = false;
  }

}
