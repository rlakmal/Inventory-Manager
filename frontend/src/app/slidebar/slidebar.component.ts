import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {

  constructor(private authService: AuthService,private router: Router,) {
  }

  logout() {
    this.authService.logout();
   this.router.navigate(['/login']);

  }
}
