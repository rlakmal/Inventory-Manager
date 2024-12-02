import {Component, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from '../../service/auth.service';
import {ForgotPasswordService} from '../../service/forgotPassword.service';
import {ValidateOtpComponent} from '../validate-otp/validate-otp.component';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    ValidateOtpComponent

  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  isVisible: any;
  username='';
  @ViewChild('otpPopup') otpPopup!: ValidateOtpComponent;

  constructor(private forgotPasswordService: ForgotPasswordService) {
  }

  submitForm() {
    const username = this.username;
    this.forgotPasswordService.forgotPassword(username).subscribe(
      data => {
        if(data.message=="success"){
          console.log('OTP sent successfully');
          alert("OTP sent successfully")
          this.closePopup();
          this.otpPopup.showPopup();


        }if (data.message=="Error"){
          alert("User not Found");
          this.closePopup();
        }
      }
    )


  }

  closePopup() {
    this.isVisible = false;
    this.resetForm();

  }
  public showPopup(){
    this.isVisible = true;
  }

  private resetForm() {
    this.username='';
  }
}
