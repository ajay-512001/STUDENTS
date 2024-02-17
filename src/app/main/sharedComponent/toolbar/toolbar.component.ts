import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  @Input() roleId:any;

  constructor(private router: Router) { }


  ngOnInit(){
    
  }

  goTo(e:any){
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
}
