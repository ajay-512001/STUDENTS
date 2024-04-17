import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  displayedColumns: string[] = [/* 'view', */'changeRole' ,'user_id', 'username', 'role_id', 'email', 'created_at_disp','photo'];
  errormsg :any;
  dataSource = new MatTableDataSource();
  public color = 'grey';
  private speed = 0.01;

  constructor(private datePipe: DatePipe,private router: Router, private dialog: MatDialog,  private adminService : AdminService) 
  {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadInitData();
  }

  // onAnimate(mesh: THREE.Mesh) {
  //   mesh.rotation.x = mesh.rotation.y += this.speed;
  // }

  loadInitData(){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
      "role_id" : ""
    }

    this.adminService.getuserlist(obj).subscribe(
      res => this.getuserlistSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }


  getuserlistSuccess(res:any){
    this.dataSource.data = res.result.data;    
    if(this.dataSource.data != undefined && this.dataSource.data != null && this.dataSource.data.length != 0){
      this.dataSource.data.forEach((e:any) => {
        e["created_at_disp"] = this.datePipe.transform( e["created_at"] ,"dd/MM/yyyy");
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
    sessionStorage.setItem("seesRoleId",e.role_id);
    sessionStorage.setItem("seesUserId",e.user_id);
    if(Number(sessionStorage.getItem("seesRoleId")) == 1){
      this.router.navigateByUrl("/admin/profileAdmin");
    }else if(Number(sessionStorage.getItem("seesRoleId")) == 2){
      this.router.navigateByUrl("/teacher/profileTeachear");
    }else if(Number(sessionStorage.getItem("seesRoleId")) == 3){
      this.router.navigateByUrl("/student/profileStudent");
    }
  }
  
  changeRole(e:any){
    if(Number(sessionStorage.getItem("role_id")) == 1){
      sessionStorage.setItem("seesRoleId",e.role_id);
      sessionStorage.setItem("seesUserId",e.user_id);
      this.router.navigateByUrl("/admin/changeRoles");
    }else{
      this.errormsg = "You are not permited to change the Role";
      let errorDialog:any;
      errorDialog = document.querySelector("#errorModal");
      errorDialog.showModal();
    }
  }
}