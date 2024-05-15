import { Injectable } from '@angular/core';
import { AjaxUtil } from 'src/app/utils/ajax.util';

@Injectable()
export class CommonService {
    baseUrl: string = 'api/common/';   
    
    constructor(private ajaxUtil: AjaxUtil) {
    }

    getStreamRoles(obj: any) {
        return this.ajaxUtil.POST(this.baseUrl + 'getStreamRoles', obj);
    }

    getRoles(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getRoles',obj);
    }

    getClassRoles(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getClassRoles',obj);
    }
    
    getSubRoles(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getSubRoles',obj);
    }

    excelUpload(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'excelUpload',obj);
    }

    getNotifList(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getNotifList',obj);
    }

    sendNotifbyId(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'sendNotifbyId',obj);
    }
}