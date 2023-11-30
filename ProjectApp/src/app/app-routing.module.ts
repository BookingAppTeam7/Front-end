import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { EditAccountComponent } from './accountmanagement/edit-account/edit-account.component';
import { CreateAccommodationComponent } from './accommodation-managment/create-accommodation/create-accommodation.component';
import { EditAccommodationComponent } from './accommodation-managment/edit-accommodation/edit-accommodation.component';
import { AccommodationComponent } from './accommodation/accommodation/accommodation.component';
import { AccommodationCardsComponent } from './accommodation/accommodation-cards/accommodation-cards.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component:LoginFormComponent, path:"login"},
  {component:RegisterFormComponent,path:"register"},
  {component:EditAccountComponent,path:"editAccount"},
  {component:CreateAccommodationComponent,path:"createAccommodation"},
  {component:EditAccommodationComponent, path:"editAccommodation"},
  {component:AccommodationComponent,path:"accommodation"},
  {component:AccommodationCardsComponent,path:"accommodation-cards"},
  {component: AccommodationDetailsComponent ,path: 'accommodations/:id'},
  {component:UsersViewComponent,path:'users-view'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
