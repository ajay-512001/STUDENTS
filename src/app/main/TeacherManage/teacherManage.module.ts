import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { SearchTeacherComponent } from './search-teacher/search-teacher.component';
import { AddUpdateTeacherComponent } from './add-update-teacher/add-update-teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { MatIconModule } from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { TeacherService } from 'src/app/service/teacher.service';
import { CommonService } from 'src/app/service/common.service';


const routes: Routes = [
    {path:"",component:TeacherListComponent},
    {path:"addTeacher",component:AddUpdateTeacherComponent},
    {path:"searchTeacher",component:SearchTeacherComponent},
    {path:"profileTeachear",component:TeacherProfileComponent}
];

@NgModule({
  declarations: [
    TeacherListComponent,
    SearchTeacherComponent,
    AddUpdateTeacherComponent,
    TeacherProfileComponent
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
    TeacherService,
    CommonService
  ],
  exports:[
    TeacherListComponent,
    SearchTeacherComponent,
    AddUpdateTeacherComponent,
    TeacherProfileComponent,
    RouterModule
  ]
})
export class TeacherModule { }
