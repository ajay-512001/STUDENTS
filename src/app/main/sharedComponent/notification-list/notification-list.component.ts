import { Component, OnDestroy, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonUtil } from './../../../utils/common.util';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  displayedColumns: string[] = ['email_from', 'email_to','send_at_disp','emailtype','ispending','sendNotif'];
  errormsg :any;
  dataSource = new MatTableDataSource();

  constructor(private datePipe: DatePipe,private router: Router, private dialog: MatDialog,  private Commonservice : CommonService, private Commonutil : CommonUtil) 
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

    this.Commonservice.getNotifList(obj).subscribe(
      res => this.getuserlistSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }


  getuserlistSuccess(res:any){
    this.dataSource.data = res.result.data;    
    if(this.dataSource.data != undefined && this.dataSource.data != null && this.dataSource.data.length != 0){
      this.dataSource.data.forEach((e:any) => {
        e["send_at_disp"] = this.datePipe.transform( e["send_date"] ,"dd/MM/yyyy");
      })
    }
  }

  apiErrorCallback(error:any){
    this.errormsg = error;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }


  sendNotification(d:any){
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
      "notif_id" : d.notif_id,
      "emailType" : d.emailtype
    }

    this.Commonservice.sendNotifbyId(obj).subscribe(
      res => this.sendNotifbyIdSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }

  sendNotifbyIdSuccess(res:any){
    this.loadInitData()
  }

  
  ngOnDestroy(): void {
       
   }
 
}
