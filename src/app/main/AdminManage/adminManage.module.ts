import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateAdminComponent } from './add-update-admin/add-update-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SearchAdminComponent } from './search-admin/search-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MatIconModule } from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { ChangeRolesComponent } from './change-roles/change-roles.component';
import { AdminService } from 'src/app/service/admin.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonService } from 'src/app/service/common.service';

const routes: Routes = [
    {path:"",component:AdminListComponent},
    {path:"addAdmin",component:AddUpdateAdminComponent},
    {path:"searchAdmin",component:SearchAdminComponent},
    {path:"profileAdmin",component:AdminProfileComponent},
    {path:"changeRoles",component:ChangeRolesComponent}
];

@NgModule({
  declarations: [
    SearchAdminComponent,
    AdminListComponent,
    AddUpdateAdminComponent,
    AdminProfileComponent,
    ChangeRolesComponent,
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
    AdminService,
    CommonService
  ],
  exports:[
    SearchAdminComponent,
    AdminListComponent,
    AddUpdateAdminComponent,
    RouterModule,
    AdminProfileComponent,
    ChangeRolesComponent
  ]
})
export class AdminModule { }
