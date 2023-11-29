import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { AccommodationComponent } from '../accommodation/accommodation/accommodation.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    AccommodationComponent
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class LayoutModule { }
