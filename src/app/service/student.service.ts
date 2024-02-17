import { Injectable } from '@angular/core';
import { AjaxUtil } from 'src/app/utils/ajax.util';

@Injectable()
export class StudentService {
    baseUrl: string = 'api/v1/student/';   
    
    constructor(private ajaxUtil: AjaxUtil) {
    }
    
    getstudentlist(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getstudentlist',obj);
    }

    getstudentinfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getstudentinfo',obj);
    }

    updatstudentinfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'updatstudentinfo',obj);
    }
}