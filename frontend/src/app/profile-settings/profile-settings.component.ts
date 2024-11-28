import { Component } from '@angular/core';
import {SlidebarComponent} from "../slidebar/slidebar.component";
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserRegisterComponent} from '../user-register/user-register.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    SlidebarComponent,
    NgIf,
    ReactiveFormsModule,
    UserRegisterComponent,
    NgOptimizedImage
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  settingsForm:FormGroup = new FormGroup({});

  onSubmit() {

  }
}
