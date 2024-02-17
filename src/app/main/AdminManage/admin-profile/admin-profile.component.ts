import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { adminProfileDetails } from 'src/app/utils/params.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/date.adapter';
import { CommonService } from 'src/app/service/common.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
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
export class AdminProfileComponent implements OnInit{
  profileFormGroup: FormGroup | any;
  public profileObj = new adminProfileDetails();
  isshowImg : boolean = false;
  altImg : any;
  subroleArr : any = [];
  classesArr : any = [];
  streamArr : any = [];
  errormsg: any;
  roleid : any;

constructor(private _formBuilder: FormBuilder,private datePipe: DatePipe, private router: Router, private dialog: MatDialog, 
  private commonService : CommonService,private adminService : AdminService) 
{}

ngOnInit() {
  this.roleid = Number(sessionStorage.getItem("role_id"));
  this.profileFormGroup = this._formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    username : ['', [Validators.required]],
    admin_id : ['', [Validators.required]],
    admin_name : ['', [Validators.required]],
    bdg : ['', [Validators.required]],
    aadhar_no : ['', [Validators.required]],
    mobileno : ['', [Validators.required]],
    hire_date : ['', [Validators.required]],
    dob : ['', [Validators.required]],
  })
  this.loadinitdata();
}

loadinitdata(){
  var obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "role_id" : Number(sessionStorage.getItem("seesRoleId")),
  }

  this.commonService.getStreamRoles(obj).subscribe(
    res => this.getStreamRolesSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

getStreamRolesSuccess(res:any){
  this.streamArr =  res.result.data;
  this.getClass("1,2,3,4,5,6,7,8,9,10,11,12,13,0")
}

getClass(str:any){debugger
  var obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "stream_id": str
  }

  this.commonService.getClassRoles(obj).subscribe(
    res => this.getClassRolesSuccess(res,str),
    error => this.apiErrorCallback(error)
  );
}

getClassRolesSuccess(res:any,str:any){
  this.classesArr =  res.result.data;

  this.getSubRole(str)
}

getSubRole(str:any){
  var obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "stream_id": str
  }

  this.commonService.getSubRoles(obj).subscribe(
    res => this.getSubRolesSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

getSubRolesSuccess(res:any){
  this.subroleArr =  res.result.data;
  this.getAdminInfo();
}

getAdminInfo(){
  var obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "user_id": Number(sessionStorage.getItem("seesUserId"))
  }

  this.adminService.getadmininfo(obj).subscribe(
    res => this.getadmininfoSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

getadmininfoSuccess(res: any){debugger
  this.profileObj = res.result.data;
  if(this.profileObj.hire_date != null && this.profileObj.hire_date != undefined){
    this.profileObj.hire_date = this.profileObj.hire_date.split("T")[0];
  }
  if(this.profileObj.dob != null && this.profileObj.dob != undefined){
    this.profileObj.dob = this.profileObj.dob.split("T")[0];
  }
  if(this.profileObj.photo != null && this.profileObj.photo != undefined && this.profileObj.photo != ""){
    this.isshowImg = true;
  }
}

onFileSelected(event:any){debugger
  const file = event.target.files[0];

  if (file) {
    this.isshowImg = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileObj.photo = e.target.result;
      sessionStorage.setItem("img_url" , this.profileObj.photo);
    };
    reader.readAsDataURL(file);
  }
}

updateProfile(){debugger
  this.profileObj.hire_date = this.datePipe.transform(this.profileObj.hire_date,"yyyy-MM-dd") + " " + "12:00:00";
  this.profileObj.dob = this.datePipe.transform(this.profileObj.dob,"yyyy-MM-dd") + " " + "12:00:00";
  let obj : any;
  obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "user_id": Number(sessionStorage.getItem("seesUserId")),
    "admin_id" : Number(this.profileObj.admin_id),
    "admin_obj" : this.profileObj
  }
  this.adminService.updateAdmininfo(obj).subscribe(
    res => this.updatstudentinfoSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

updatstudentinfoSuccess(res:any){debugger
  if(res.result.isComplete){
    this.errormsg = res.result.msg;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
    this.getAdminInfo();
  }else{
    this.errormsg = res.result.msg;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }
}

apiErrorCallback(error:any){
  this.errormsg = error;
  let errorDialog:any;
  errorDialog = document.querySelector("#errorModal");
  errorDialog.showModal();
}

goback(){
  this.router.navigateByUrl("/admin")
}

}
