import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RegisterService} from '../../service/register.service';



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
  email = '';
  password = '';
  username = '';
  name = "";
  rePassword = '';
  passwordError = false;

  constructor(private registerService: RegisterService) {}

  public showPopup(): void {
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
    this.resetForm();
  }

  submitForm(): void {
    if (this.password !== this.rePassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    console.log('Form submitted!', {email: this.email, password: this.password, userName: this.username});
    const user = {
      email: this.email,
      username: this.username,
      name: this.name,
      password: this.password,
      rePassword: this.rePassword,

    };
    this.registerService.register(user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        if (response.code === 200) {
          alert(response.message);
          this.closePopup();
        } else {
          alert('Registration failed');
        }
      },
      (error) => {
        if(error.error.data==="Username has already taken"){
          alert('Username already taken');
        }else if(error.error.data==="Email has already Taken"){
          alert('Email already taken');

        }
        console.error('Registration error:', error);

      }
    );
    this.closePopup();
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.rePassword='';
    this.username = '';
    this.name = '';
  }

}
