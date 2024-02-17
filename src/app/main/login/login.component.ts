import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSigin : boolean = false;
  headers = new HttpHeaders();
  password: any;
  loginpassword : any;
  email:any;
  loginemail:any;
  username :any;
  loginusername :any;
  errormsg:any;
  successmsg:any;
  
  constructor(private _httpClient: HttpClient , private router: Router, private loginService : LoginService) { }

  ngOnInit(){
    sessionStorage.removeItem("Access_Token");
  }

  signinOpen(){
    this.isSigin = false;
  }

  signupOpen(){
    this.isSigin = true;
  }

  signUp(){debugger
  let obj = {
    "user_name" : this.username,
    "email" : this.email,
    "password" : this.password
  }
  this.loginService.signUp(obj).subscribe(
    res => this.signUpSuccess(res),
    error => this.apiErrorCallback(error)
  );
  }

  signUpSuccess(res:any){debugger
    if(res.result.isComplete && res.result.token){
      sessionStorage.setItem("Access_Token",res.result.token);
      sessionStorage.setItem("role_id",res.result.data.role_id);
      sessionStorage.setItem("user_id",res.result.data.user_id);
      sessionStorage.setItem("user_name",res.result.data.username);
      this.successmsg = res.result.msg;
      if(res.result.data.role_id == 1){
        this.router.navigateByUrl("/admin");
      }else if(res.result.data.role_id == 2) {
        this.router.navigateByUrl("/teacher");
      }else if(res.result.data.role_id == 3) {
        this.router.navigateByUrl("/changeRoles");
      }else{
        this.router.navigateByUrl("/changeRoles");
      }
    }else{
      this.errormsg = res.result.msg;
      let errorDialog:any;
      errorDialog = document.querySelector("#errorModal");
      errorDialog.showModal();
    }
  }

  lognin(){debugger
    let obj = {
        "user_name" : this.loginusername,
        "email" : this.loginemail,
        "password" : this.loginpassword
    }
    this.loginService.signIn(obj).subscribe(
      res => this.signInSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }

  signInSuccess(res:any){
    if(res.result.isComplete && res.result.token){
      sessionStorage.setItem("Access_Token",res.result.token);
      sessionStorage.setItem("role_id",res.result.data.role_id);
      sessionStorage.setItem("user_id",res.result.data.user_id);
      sessionStorage.setItem("user_name",res.result.data.username);
      sessionStorage.setItem("photo",res.result.data.photo);
      this.successmsg = res.result.msg;
      if(res.result.data.role_id == 1){
        this.router.navigateByUrl("/admin");
      }else if(res.result.data.role_id == 2) {
        this.router.navigateByUrl("/teacher");
      }else if(res.result.data.role_id == 3) {
        this.router.navigateByUrl("/changeRoles");
      }else{
        this.router.navigateByUrl("/changeRoles");
      }
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

  gotoPage(){
    let successDialog:any;
    successDialog = document.querySelector("#successModal");
    successDialog.close();
  }
}
