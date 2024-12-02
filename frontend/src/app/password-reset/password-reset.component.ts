import { Component } from '@angular/core';
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from '../../service/user.service';
import {ForgotPasswordService} from '../../service/forgotPassword.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  isVisible = false;
  password = '';
  rePassword = '';
  passwordError = false;
  username = '';

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  submitForm() {
    if (this.password !== this.rePassword) {
      this.passwordError = true;
      return;
    }
    const user = {
      password: this.password,
      rePassword: this.rePassword,
      username: this.username,

    };
    console.log(user);
    this.forgotPasswordService.changePassword(user).subscribe(
      (response) => {
        console.log(response);
        if(response.message == "success") {
          console.log('Successfully changed password');
          alert('Password reset successful!');
          this.closePopup();
        }
      }
    )


  }

  closePopup() {
    this.isVisible = false;
    this.resetForm();

  }

  showPopup(username:string) {
    this.username =username;
    this.isVisible = true;
  }

  private resetForm() {
    this.password = '';
    this.rePassword = '';
  }
}
