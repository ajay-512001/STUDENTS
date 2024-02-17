import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { MaterialModule } from 'src/app/material.module';

const routes : Routes = [
  {
    path : "**",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
  ],
  providers: [
    LoginService
  ],
})
export class LoginModule { }
