import {Component, OnInit} from '@angular/core';
import {SlidebarComponent} from "../slidebar/slidebar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    SlidebarComponent,
    ReactiveFormsModule,
    NgIf,

  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent implements OnInit {
  ProfileForm: FormGroup;
  private userId ='';
  constructor(private UserService: UserService, private formBuilder: FormBuilder) {
    this.ProfileForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.fetchDetails();
  }

  fetchDetails(){
  this.UserService.getUserDetails().subscribe(
    (response:any) => {
      console.log('User details fetched successfully:',response);
      this.userId=response.data.userId;
      // Assuming data contains user details like name, email, etc.
      this.ProfileForm.patchValue({
        name: response.data.name,
        email: response.data.email,
      });
    },
    (error: any) => {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details. Please try again.');
    }
    )
  }

  onSubmit() {
    const {email,name} = this.ProfileForm.value;
    console.log(email,name);
    console.log(this.userId)
    this.UserService.updateProfile(email,name,this.userId).subscribe(
      (response:any) => {
        console.log(response);
        if (response.message=="Success"){
          alert("Email and Name Updated");
        }else if(response.message=="error"){
          alert("Email taken already taken . Please try again.");
          location.reload();
        }else if(response.message=="emailSuccess"){
          alert("Email Successfully Updated!");
          location.reload();
        }else if(response.message=="nameSuccess"){
          alert("Name Successfully Updated!");
          location.reload();
        }
      }
    )

  }
}
