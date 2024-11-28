import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSelectionList} from '@angular/material/list';


@Component({
  selector: 'app-edt-inventory',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatSelect,
    MatSelectionList,
    MatOption,
  ],
  templateUrl: './edt-inventory.component.html',
  styleUrl: './edt-inventory.component.css'
})
export class EdtInventoryComponent {
  formData: any;

  constructor(public dialogRef: MatDialogRef<EdtInventoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = { ...data };
    console.log(this.formData)
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.formData);
  }
}
