import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
//import { LoaderService } from 'app/loading-spinner/services/loader.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { LodingSpinnerService } from '../main/loading-spinner/loading-spinner.service';

var that: any;
@Injectable({
    providedIn: 'root'
})

export class AjaxUtil {
    apiBaseUrl: string = environment.apiUrl;
    apiAuthUrl : string = environment.apiAuthUrl;
    apiUrl: string = "";


    constructor(public _router: Router,  private spinnerService: LodingSpinnerService,
         private _httpClient: HttpClient, ) { that = this }


         
    public handleError(error: any) {
        that.spinnerService.resetSpinner();
    }

    public POST(endPoint: any, jsonData: any, isLoading: any = true) {
        if (isLoading) {
            this.spinnerService.requestStarted();
        }

        const _headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + sessionStorage.getItem("Access_Token"))
            .set('Content-Type', 'application/json')
            .set('Api_secret_key', "ajayishere12345")

        if (endPoint.indexOf('http') > -1) {
            this.apiUrl = endPoint;
        } else {
            this.apiUrl = this.apiBaseUrl + endPoint;
        }

        return this._httpClient.post(this.apiUrl, jsonData, { 'headers': _headers }).pipe(
            map((res: any) => {
                if (isLoading) {
                    this.spinnerService.requestEnded();
                }
                return res;
            }),
            catchError(that.handleError));
    }

    public POST_Auth(endPoint: any, jsonData: any, isLoading: any = true) {
        if (isLoading) {
            this.spinnerService.requestStarted();
        }

        const _headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api_secret_key', "ajayishere12345")

        if (endPoint.indexOf('http') > -1) {
            this.apiUrl = endPoint;
        } else {
            this.apiUrl = this.apiAuthUrl + endPoint;
        }

        return this._httpClient.post(this.apiUrl, jsonData, { 'headers': _headers }).pipe(
            map((res: any) => {
                if (isLoading) {
                    this.spinnerService.requestEnded();
                }
                return res;
            }),
            catchError(that.handleError));
    }
}