import { Injectable } from '@angular/core';
import { AjaxUtil } from 'src/app/utils/ajax.util';

@Injectable()
export class TeacherService {
    baseUrl: string = 'api/v1/teacher/';   
    
    constructor(private ajaxUtil: AjaxUtil) {
    }
    
    getteacherlist(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getteacherlist',obj);
    }

    getteacherinfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getteacherinfo',obj);
    }

    updateteacherinfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'updateteacherinfo',obj);
    }
}