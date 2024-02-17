import { Injectable } from '@angular/core';
import { AjaxUtil } from 'src/app/utils/ajax.util';

@Injectable()
export class AdminService {
    baseUrl: string = 'api/v1/admin/';   
    
    constructor(private ajaxUtil: AjaxUtil) {
    }

    getuserroleinfo(obj: any) {
        return this.ajaxUtil.POST(this.baseUrl + 'getuserroleinfo', obj);
    }

    updateroleinfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'updateroleinfo',obj);
    }

    getuserlist(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getuserlist',obj);
    }
    
    getadminlist(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getadminlist',obj);
    }

    getadmininfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'getadmininfo',obj);
    }

    updateAdmininfo(obj: any){
        return this.ajaxUtil.POST(this.baseUrl + 'updateAdmininfo',obj);
    }
}