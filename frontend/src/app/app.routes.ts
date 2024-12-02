import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SearchInventoryComponent} from './search-inventory/search-inventory.component';
import {AddInventoryComponent} from './add-inventory/add-inventory.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {AuthGuard} from './guards/auth.guard';
import {ForgotPasswordService} from '../service/forgotPassword.service';

export const routes: Routes = [
  {path:'login',component:LoginComponent },
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'search-inventory',component:SearchInventoryComponent,canActivate:[AuthGuard]},
  {path:'add-inventory',component:AddInventoryComponent,canActivate:[AuthGuard]},
  {path:'profile-settings',component:ProfileSettingsComponent,canActivate:[AuthGuard]},
  {path:'forgot-password',component:ForgotPasswordService,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
