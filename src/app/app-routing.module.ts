import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {
  path:"login",
  loadChildren:() => import('./main/login/login.module').then(m =>m.LoginModule)
  },
  {
    path:"student",
    loadChildren:() => import('./main/StudentManage/studentManage.module').then(m =>m.StudentModule)
  },
  {
    path:"teacher",
    loadChildren:() => import('./main/TeacherManage/teacherManage.module').then(m =>m.TeacherModule)
  },
  {
    path:"admin",
    loadChildren:() => import('./main/AdminManage/adminManage.module').then(m =>m.AdminModule)
  },
  {
    path:"userList",
    loadChildren:() => import('./main/user-list/user-list.module').then(m =>m.UserListModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
