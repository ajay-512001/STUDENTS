import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent, navToolbar } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from 'src/app/material.module';
import { UploadExcleDataComponent } from './upload-excle-data/upload-excle-data.component';
import { RouterModule, Routes } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonService } from 'src/app/service/common.service';
import { MatIconModule } from '@angular/material/icon';
import { NotificationListComponent } from './notification-list/notification-list.component';


const routes: Routes = [
  {path:"excelUpload",component:UploadExcleDataComponent},
  {path:"notificationList",component:NotificationListComponent},
];

@NgModule({
  declarations: [
    NavbarComponent,
    navToolbar,
    FooterComponent,
    ToolbarComponent,
    UploadExcleDataComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MaterialModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  providers: [
    DatePipe,
    CommonService
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ToolbarComponent,
    navToolbar,
    UploadExcleDataComponent,
    NotificationListComponent
  ]
})
export class SharedModule { }
