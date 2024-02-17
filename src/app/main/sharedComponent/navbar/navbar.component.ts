import { Component, Inject, Input, OnInit, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  userName : any;
  imgUrl : any;
  role_id:any;
  navToolbarDigDig : any = MatDialogRef<navToolbar>;
  MenuArray : any = [];
  errormsg :any;
  window : any;

  constructor(private router: Router, private dialog: MatDialog,private renderer: Renderer2, private el: ElementRef,private commonService : CommonService) { }
  
  ngOnInit() {debugger
   this.userName = sessionStorage.getItem("user_name");
   this.role_id = sessionStorage.getItem("role_id");
   this.imgUrl = sessionStorage.getItem("photo");
   if(this.imgUrl == undefined || this.imgUrl == null || this.imgUrl == ""){
    this.imgUrl = "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png";
   }
   this.loadInitData();
  }

  loadInitData(){
    this.MenuArray = environment.MenuArray;
  }

  apiErrorCallback(error:any){
    this.errormsg = error;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }

  gotoProfile(){
    if(this.role_id == 0){
      this.router.navigateByUrl("/teacher/profileTeachear");
    }else{
      this.router.navigateByUrl("/student/profileStudent");
    }
  }

  logout(){
    sessionStorage.removeItem("Access_Token");
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }


  goto(e:any){debugger
    if(e == "a"){
      this.router.navigateByUrl("/admin");
    }else if(e == "t"){
      this.router.navigateByUrl("/teacher");
    }else if(e == "s"){
      this.router.navigateByUrl("/student");
    }else if(e == "sedit"){
      this.router.navigateByUrl("/student/addStudent");
    }else if(e == "sfind"){
      this.router.navigateByUrl("/student/searchStudent");
    }else if(e == "aedit"){
      this.router.navigateByUrl("/admin/addAdmin");
    }else if(e == "afind"){
      this.router.navigateByUrl("/admin/searchAdmin");
    }else if(e == "tedit"){
      this.router.navigateByUrl("/teacher/addTeacher");
    }else if(e == "tfind"){
      this.router.navigateByUrl("/teacher/searchTeacher");
    }else if(e == "ul"){
      this.router.navigateByUrl("/userList");
    }
  }

  closeToolbar(){
    this.navToolbarDigDig.close();
  }

  openToolbar(){
    this.navToolbarDigDig = this.dialog.open(navToolbar, {
      disableClose: false,
      position: {
        left: '2px',
      },
      data: {
        applyText: "filter",
        menuArray : this.MenuArray,
        roleId : this.role_id
      }
    });

    this.navToolbarDigDig.afterClosed().subscribe((result:any) => {debugger
      if (result && result.action === 1) {        
        this.router.navigateByUrl(result.menuItem.path);
      }
    }); 
  }
}



@Component({
  selector: 'navToolbar',
  templateUrl: 'navToolbar.html',
  styleUrls: ['./navbar.component.scss']
})
export class navToolbar {
  lngType = "";
  max_date :any;
  dsbFromDate : any;
  dsbToDate : any;
  MenuArraydisp : any = [];
  roleId:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { headerText: any,menuArray:any, roleId :any },
  public navToolbarDig: MatDialogRef<navToolbar>) {
  }

  ngOnInit(){debugger
    this.MenuArraydisp = this.data.menuArray;
    this.roleId = this.data.roleId;
  }

  clickOntheElement(id:any){
    this.navToolbarDig.close({
      action: 1,
      menuItem:id,
    });
  }

  closePopup() {
    this.navToolbarDig.close();
  }

}