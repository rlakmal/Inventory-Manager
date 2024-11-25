import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SearchInventoryComponent} from './search-inventory/search-inventory.component';
import {AddInventoryComponent} from './add-inventory/add-inventory.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'search-inventory',component:SearchInventoryComponent},
  {path:'add-inventory',component:AddInventoryComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
