import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { AdminService } from 'src/app/service/admin.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

const routes : Routes = [
  {
    path : "**",
    component: UserListComponent
  }
]


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MaterialModule,
    MatPaginatorModule,
  ],
  providers: [
    DatePipe,
    AdminService
  ]
})
export class UserListModule { }
