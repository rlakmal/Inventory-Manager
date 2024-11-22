import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  isVisible = false;
  email ='';
  password ='';
  username ='';
  confirmPassword ='';
  passwordError = false;

  public showPopup(): void {
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
    this.resetForm();
  }

  submitForm(): void {
    if(this.password !== this.confirmPassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    console.log('Form submitted!', { email: this.email, password: this.password,userName: this.username });
    this.closePopup();
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
  }
}
