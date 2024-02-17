import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'students';
  accessToken : any;
  loggedIn = false;
  private _unsubscribeAll: Subject<any> | undefined;
  currentRouteUrl: any;
  roleId : any;

  constructor(private router: Router) { 
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
          //console.log(sessionStorage.getItem('Access_Token'))
          this.check();
      }
//       if (event instanceof NavigationEnd) {
//         this.currentRouteUrl = event.url;
//         console.log(event);
//       }
});
  }

  check(){
    this.accessToken = sessionStorage.getItem('Access_Token');
    if(!this.accessToken){
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }

    if(sessionStorage.getItem("role_id")!= undefined && sessionStorage.getItem("role_id")!= null && sessionStorage.getItem("role_id")!= ""){
      this.roleId = sessionStorage.getItem("role_id");
    }
  }

  ngOnInit() {debugger
  }

  ngOnDestroy(): void{}
}
