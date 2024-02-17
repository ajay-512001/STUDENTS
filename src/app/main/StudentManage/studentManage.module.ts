import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { SearchStudentComponent } from './search-student/search-student.component';
import { AddUpdateStudentComponent } from './add-update-student/add-update-student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
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
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/service/common.service';

const routes: Routes = [
    {path:"",component:StudentListComponent},
    {path:"addStudent",component:AddUpdateStudentComponent},
    {path:"searchStudent",component:SearchStudentComponent},
    {path:"profileStudent",component:StudentProfileComponent}
];

@NgModule({
  declarations: [
    AddUpdateStudentComponent,
    SearchStudentComponent,
    StudentListComponent,
    StudentProfileComponent
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
    StudentService,
    CommonService
  ],
  exports:[
    AddUpdateStudentComponent,
    SearchStudentComponent,
    StudentListComponent,
    RouterModule,
    StudentProfileComponent
  ]
})
export class StudentModule { }
