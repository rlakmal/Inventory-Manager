import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ForgotPasswordService} from '../../service/forgotPassword.service';
import {PasswordResetComponent} from '../password-reset/password-reset.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    PasswordResetComponent
  ],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.css'
})
export class ValidateOtpComponent {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  isVisible: any;

  @ViewChild('resetPopup') resetPopup!: PasswordResetComponent;

  constructor(private forgetPasswordService:ForgotPasswordService) {
  }


  moveFocus(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 4) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }
  }
  getOtp(): string {
    return `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
  }

  closePopup() {
    this.isVisible = false;
    this.resetForm();

  }

  submitForm() {
    console.log(this.otp1);
    const otp = this.getOtp();
    this.forgetPasswordService.validateOtp(otp).subscribe(
      data => {
        console.log(data);
        if(data.message=="success"){
          alert("Otp Validate successfully")
          this.closePopup();
          this.resetPopup.showPopup(data.data.username);
        }else if(data.code == 404) {
          alert("Otp Not Found")
          this.closePopup();
        }else{
          alert("Otp has expired")
          this.closePopup()
        }
      }
    )
  }
  public showPopup() {
    this.isVisible = true;

  }

  private resetForm() {
    this.otp1='';
    this.otp2='';
    this.otp3='';
    this.otp4='';
  }
}
