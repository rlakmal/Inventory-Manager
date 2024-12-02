import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserRegisterComponent} from '../user-register/user-register.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage, UserRegisterComponent, ResetPasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup= new FormGroup({});
  passwordVisible: boolean = false;

  @ViewChild('popup') popup!:UserRegisterComponent;
  @ViewChild('pwPopup') pwPopup!: ResetPasswordComponent;

  constructor(private fb: FormBuilder,private router:Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  paswdVisibility(): void{
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response.code === 200) {
            alert(response.message);
            this.authService.storeToken(response.data.accessToken);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Invalid credentials');
          }
        },
        (error) => {
          console.log(error);
          if(error.error.data==="UserName Not Found"){
            alert('UserName Not Found');
          }else {
            alert(error.error.data);
          }

        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  openPopup(): void {
    console.log('Open Popup clicked');
    this.popup.showPopup();
  }

  resetPwPopup() {
    console.log('Reset PwPopup');
    this.pwPopup.showPopup();

  }
}
