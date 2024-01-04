import { CommonModule } from '@angular/common';
import { OwnerRatingComponent } from './owner-rating/owner-rating.component';
import { MatRadioButton } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { HomeComponent } from '../layout/home/home.component';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';




@NgModule({
  declarations: [
    OwnerRatingComponent
  ],
  imports: [
    CommonModule,
    MatRadioButton,
    OwnerRatingComponent,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule

  ]
})
export class RatingModule { }
