import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherListComponent implements OnInit{

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  displayedColumns: string[] = ['view','user_id', 'teacher_id', 'teacher_name', 'email', 'hire_at_disp','photo'];
  errormsg :any;
  dataSource = new MatTableDataSource();


  constructor(private datePipe: DatePipe,private router: Router, private dialog: MatDialog,  private teacherService : TeacherService) 
  {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadInitData();
  }


  loadInitData(){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
    }

    this.teacherService.getteacherlist(obj).subscribe(
      res => this.getteacherlistSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }


  getteacherlistSuccess(res:any){
    this.dataSource.data = res.result.data;
    if(this.dataSource.data != undefined && this.dataSource.data != null && this.dataSource.data.length != 0){
      this.dataSource.data.forEach((e:any) => {
        e["hire_at_disp"] = this.datePipe.transform( e["hire_date"] ,"dd/MM/yyyy");
      })
    }
  }

  apiErrorCallback(error:any){
    this.errormsg = error;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }

  viewRoleDetails(e:any){
    sessionStorage.setItem("seesRoleId",e.role_id)
    sessionStorage.setItem("seesUserId",e.user_id)
    this.router.navigateByUrl("/teacher/profileTeachear");
  }


}
