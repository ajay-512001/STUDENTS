import { Component, OnDestroy, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonUtil } from './../../../utils/common.util';
import { CommonService } from 'src/app/service/common.service';
import { Socket, io } from 'socket.io-client';

@Component({
  selector: 'app-upload-excle-data',
  templateUrl: './upload-excle-data.component.html',
  styleUrls: ['./upload-excle-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadExcleDataComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  displayedColumns: string[] = ['name', 'age'];
  errormsg :any;
  dataSource = new MatTableDataSource();
  s_role_id: any;
  fileName : any;
  file : any;
  fileNameDots :any;
  excel_id:any;
  ExcelOptions = [{
    excel_id : 1,
    excel_name : "for student"
  },{
    excel_id : 2,
    excel_name : "for teacher"
  },{
    excel_id : 2,
    excel_name : "student Marks"
  }]

  socket: any;
  roomno:any;
  idno:any;
  msg:any ="";
  messages: string[] = [];
  
  constructor(private datePipe: DatePipe,private router: Router, private dialog: MatDialog,  private Commonservice : CommonService, private Commonutil : CommonUtil) 
  {this.socket = io('http://localhost:3002');}

  ngOnInit() {
    this.s_role_id = Number(sessionStorage.getItem("role_id"));
    this.dataSource.paginator = this.paginator;

  this.socket.on('connect', () => {
    console.log('Connected to server',this.socket.id);
  });

  this.socket.on('receive',(data:any) => {
    console.log("recevied message" , data)
  })

  // this.socket.on('message', (msg: string) => {
  //     this.msg.push({ sender: this.idno, message: msg });
  // });
  }


  
  submitchat(){
    //this.socket.emit("message",this.msg)
    this.socket.emit("message", { message : this.msg, room : this.roomno } )
  }

  joinroom(){
    this.socket.emit("join" , this.idno)
  }


  ngOnDestroy(): void {
   this.socket.disconnect();   
  }


  apiErrorCallback(error:any){
    this.errormsg = error;
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }

  
  onFileSelected(event:any){
    const file = event.target.files[0];

    if (file) {
      let file_name = file.name.replaceAll("&", "").replaceAll("+", "");
      this.fileName = file_name;
      this.fileNameDots = this.Commonutil.takeFileNamewithLength(file_name, 15);
      const reader = new FileReader();
      reader.onload = (e: any) => {debugger
        this.file = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadExcle(){
    this.errormsg = "Are you sure want to upload data ?";
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.showModal();
  }

  excelUploadSuccess(res:any){
    this.dataSource.data = res.result.data;
  }

  uploadFinal(){
    let errorDialog:any;
    errorDialog = document.querySelector("#errorModal");
    errorDialog.close();
    var obj = {
      "s_user_id": Number(sessionStorage.getItem("user_id")),
      "s_role_id": Number(sessionStorage.getItem("role_id")),
      "fileName" : this.fileName,
      "file" : this.file
    }

    this.Commonservice.excelUpload(obj).subscribe(
      res => this.excelUploadSuccess(res),
      error => this.apiErrorCallback(error)
    );
  }
}
