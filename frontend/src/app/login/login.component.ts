import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserRegisterComponent} from '../user-register/user-register.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage, UserRegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup= new FormGroup({});
  passwordVisible: boolean = false;

  @ViewChild('popup') popup!:UserRegisterComponent;



  constructor(private fb: FormBuilder,private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  paswdVisibility(): void{
    this.passwordVisible = !this.passwordVisible;
  }


  onSubmit(): void {
    const {username, password} = this.loginForm.value;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Username:', username);
      console.log('Password:', password);

      if (username === 'admin' && password === 'password') {
        // Simulate successful login
        this.router.navigate(['dashboard']);
      } else {
        alert('Invalid username or password');
      }
    }
  }

  onForgotPassword() {

  }

  openPopup(): void {
    console.log('Open Popup clicked');
    this.popup.showPopup();
  }
}
