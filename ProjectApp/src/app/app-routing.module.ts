import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WineComponent} from "./wine/wine/wine.component";
import {HomeComponent} from "./layout/home/home.component";
import {CreateWineComponent} from "./wine/create-wine/create-wine.component";
import {WineCardsComponent} from "./wine/wine-cards/wine-cards.component";
import {WineDetailsComponent} from "./wine/wine-details/wine-details.component";
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { AccommodationComponent } from './accommodation/accommodation/accommodation.component';
import { AccommodationCardsComponent } from './accommodation/accommodation-cards/accommodation-cards.component';

const routes: Routes = [
  {component: WineComponent, path:"wine"},
  {component: HomeComponent, path:"home"},
  {component: WineCardsComponent, path:"wine-cards"},
  {component: WineDetailsComponent, path:"wine/:wineId"},
  {component: CreateWineComponent, path:"create"},
  {component:LoginFormComponent, path:"login"},
  {component:RegisterFormComponent,path:"register"},
  {component:AccommodationComponent,path:"accommodation"},
  {component:AccommodationCardsComponent,path:"accommodation-cards"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
