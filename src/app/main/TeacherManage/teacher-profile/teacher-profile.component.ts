import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { teacherProfileDetails } from 'src/app/utils/params.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/date.adapter';
import { TeacherService } from 'src/app/service/teacher.service';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
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
export class TeacherProfileComponent implements OnInit{
  profileFormGroup: FormGroup | any;
  public profileObj = new teacherProfileDetails();
  isshowImg : boolean = false;
  altImg : any;
  subroleArr : any = [];
  classesArr : any = [];
  streamArr : any = [];
  errormsg: any;
  timetableArry:any = []
  timetableObj = {
    "subrole_id":"",
    "class_id": "",
    "stream_id":"",
    "role_id" : 2
  }
  max = 5;
  isTimeUpdate : boolean = false;
  IstimeUpdate : any;
  roleid : any;

constructor(private _formBuilder: FormBuilder,private datePipe: DatePipe, private router: Router, private dialog: MatDialog, 
  private commonService : CommonService,private teacherService : TeacherService) 
{}


ngOnInit() {
  this.roleid = Number(sessionStorage.getItem("role_id"));
  this.profileFormGroup = this._formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    username : ['', [Validators.required]],
    teacher_id : ['', [Validators.required]],
    teacher_name : ['', [Validators.required]],
    bdg : ['', [Validators.required]],
    aadhar_no : ['', [Validators.required]],
    mobileno : ['', [Validators.required]],
    hire_date : ['', [Validators.required]],
    dob : ['', [Validators.required]],
  })
  this.timetableArry.push(this.timetableObj)
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
  this.getTeacherRoleInfo();
}

getTeacherRoleInfo(){
  var obj = {
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "user_id": Number(sessionStorage.getItem("seesUserId"))
  }

  this.teacherService.getteacherinfo(obj).subscribe(
    res => this.getteacherinfoSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

getteacherinfoSuccess(res: any){debugger
  this.profileObj = res.result.data;
  this.profileObj.hire_date = this.profileObj.hire_date.split("T")[0];
  this.profileObj.dob = this.profileObj.dob.split("T")[0];
  this.timetableArry = res.result.data.teacherTime_arry;
  let id = 1;
  this.timetableArry.forEach((e:any) => {
    e["id"] = id;
    id++
  });
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
  /* check the array  */
  this.timetableArry.forEach((e: any) => {
    if(e.stream_id == "" || e.class_id == "" || e.stream_id == "" || e.stream_id == null || e.class_id == null || e.stream_id == null || e.stream_id == undefined || e.class_id == undefined || e.stream_id == undefined){
      this.timetableArry.pop(e);
    }
  });

  this.profileObj.teacherTime_arry = this.timetableArry;
  /* check the array  */
  let action;
  if(this.IstimeUpdate){
    action = "withtime";
  }else{
    action = "withouttime";
  }
  let obj : any;
  obj = {
    "action" : action,
    "s_user_id": Number(sessionStorage.getItem("user_id")),
    "s_role_id": Number(sessionStorage.getItem("role_id")),
    "user_id": Number(sessionStorage.getItem("seesUserId")),
    "teacher_id" : Number(this.profileObj.teacher_id),
    "teacher_obj" : this.profileObj
  }
  this.teacherService.updateteacherinfo(obj).subscribe(
    res => this.updateteacherinfoSuccess(res),
    error => this.apiErrorCallback(error)
  );
}

updateteacherinfoSuccess(res:any){debugger
  if(res.result.isComplete){
    this.errormsg = res.result.msg;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
    this.isTimeUpdate = false;
    this.IstimeUpdate = false;
    this.getTeacherRoleInfo();
  }else{
    this.errormsg = res.result.msg;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }
}



removeTime(timetable : any){debugger
  if(this.timetableArry.length != 1){
    const indexToRemove = this.timetableArry.findIndex((e:any) => e.id === timetable.id);
    this.timetableArry.splice(indexToRemove,1);
    let id = 1;
    this.timetableArry.forEach((e:any) => {
      e.id = id;
      id++;
    });
  }else{
    this.timetableArry.pop(this.timetableObj);
    this.timetableArry.push({
      "id" : 1,
      "subrole_id":"",
      "class_id": "",
      "stream_id":"",
      "role_id" : 2
    });
  }
}

addMoreTime(){
  if(this.timetableArry.length < this.max){
    this.timetableArry.push({
      "id" : this.timetableArry[this.timetableArry.length-1].id+1,
      "subrole_id":"",
      "class_id": "",
      "stream_id":"",
      "role_id" : 2
    });
  }
}

apiErrorCallback(error:any){
  this.errormsg = error;
  let errorDialog:any;
  errorDialog = document.querySelector("#errorModal");
  errorDialog.showModal();
}

goback(){
  this.router.navigateByUrl("/teacher")
}

checkTimeUpdate(e : any){
  if(e.checked){
    this.isTimeUpdate = true;
  }else{
    this.isTimeUpdate = false;
  }
}
}
