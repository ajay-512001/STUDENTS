import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './main/loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from './main/sharedComponent/shared.module';
import { TeacherModule } from './main/TeacherManage/teacherManage.module';
import { NavigationService } from './service/navigation.service';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { StudentModule } from './main/StudentManage/studentManage.module';
import { AdminModule } from './main/AdminManage/adminManage.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoadingSpinnerComponent,
    ],
    providers: [NavigationService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        SharedModule,
        TeacherModule,
        StudentModule,
        AdminModule,
        FormsModule,
        BackButtonDisableModule.forRoot({
            preserveScroll: true
          })
    ]
})
export class AppModule { }
