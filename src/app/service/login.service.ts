import { Injectable } from '@angular/core';
import { AjaxUtil } from 'src/app/utils/ajax.util';

@Injectable()
export class LoginService {
    baseUrl: string = 'api/v1/auth/';   
    
    constructor(private ajaxUtil: AjaxUtil) {
    }

    signUp(obj: any) {
        return this.ajaxUtil.POST_Auth(this.baseUrl + 'signUp', obj);
    }

    signIn(obj: any){
        return this.ajaxUtil.POST_Auth(this.baseUrl + 'signIn',obj);
    }
}