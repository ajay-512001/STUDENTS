import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { roleAssigning } from 'src/app/utils/params.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/date.adapter';
import { AdminService } from 'src/app/service/admin.service';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-change-roles',
  templateUrl: './change-roles.component.html',
  styleUrls: ['./change-roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class ChangeRolesComponent implements OnInit{
  RoleFormGroup: FormGroup | any;
  public roleObj = new roleAssigning();
  isshowImg : boolean = false;
  errormsg : any;
  roleArr : any = [];
  user_id: any;
  role_id: any;
  s_role_id: any;


  constructor(private _formBuilder: FormBuilder,private datePipe: DatePipe, 
    private router: Router, private dialog: MatDialog,  private adminService : AdminService,  private commonService : CommonService) 
  {}

  ngOnInit() {
    this.RoleFormGroup = this._formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      username : ['', [Validators.required]],
      password : ['', [Validators.required]],
      role_id : ['', [Validators.required]]
    })
    this.s_role_id = Number(sessionStorage.getItem("role_id"))
    if(sessionStorage.getItem("seesUserId") != undefined && sessionStorage.getItem("seesUserId") != null){
      this.user_id = sessionStorage.getItem("seesUserId");
    }else{
      this.user_id = sessionStorage.getItem("user_id");
    }
    if(sessionStorage.getItem("seesRoleId") != undefined && sessionStorage.getItem("seesRoleId") != null){
      this.role_id = sessionStorage.getItem("seesRoleId");
    }else{
      this.role_id = this.s_role_id
    }
    this.loadInitData();
  }

  loadInitData(){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
      "user_id": this.user_id,
      "role_id": this.role_id
    }

    this.adminService.getuserroleinfo(obj).subscribe(
      res => this.getuserroleinfoSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }

  getuserroleinfoSuccess(res : any){
    this.roleObj = res.result.data;
    if(this.roleObj.photo != null && this.roleObj.photo != undefined && this.roleObj.photo != ""){
      this.isshowImg = true;
    }
    this.rolesArray();
  }

  rolesArray(){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
    }
  
    this.commonService.getRoles(obj).subscribe(
      res => this.getRolesSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }

  getRolesSuccess(res:any){
    this.roleArr = res.result.data;
  }

  apiErrorCallback(error:any){
    this.errormsg = error;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }

  updateRole(){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
    }

    Object.assign(obj,this.roleObj)
    this.adminService.updateroleinfo(obj).subscribe(
      res => this.updateroleinfoSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }

  updateroleinfoSuccess(res:any){
    this.roleObj = res.result.data;
    if(this.roleObj.photo != null && this.roleObj.photo != undefined && this.roleObj.photo != ""){
      this.isshowImg = true;
    }
    if(res.result.data.role_id == 1){
      this.router.navigateByUrl("/admin");
    }else if(res.result.data.role_id == 2){
      this.router.navigateByUrl("/teacher");
    }else if(res.result.data.role_id == 3){
      this.router.navigateByUrl("/student");
    }else if(res.result.data.role_id == 4){
      this.router.navigateByUrl("/userList");
    }else if(res.result.data.role_id == 5){
      this.router.navigateByUrl("/userList");
    } 
  }

  goback(){
    this.router.navigateByUrl("/userList");
  }


  onFileSelected(event:any){
    const file = event.target.files[0];

    if (file) {
      this.isshowImg = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.roleObj.photo = e.target.result;
        sessionStorage.setItem("img_url" , this.roleObj.photo);
      };
      reader.readAsDataURL(file);
    }
  }
}
