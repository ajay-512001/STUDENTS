import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fromEvent, merge, Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonUtil {
    public parent : any;
    menuCount: number = 0;
    public SelectedIndex: Subject<any> = new Subject<any>();
    public Data: Subject<any> = new Subject<any>();
    checkinterent = true;

    constructor(public _router: Router, public dialog: MatDialog) { }
    
    CheckSession() {
        if (typeof localStorage.getItem('access_token') == 'undefined' || localStorage.getItem('access_token') == null
            || localStorage.getItem('access_token') == '' || localStorage.length == 0) {
                this._router.navigateByUrl('/login');
                return false;
        } else {
            return true;
        }
    }

    takeFileName(fName :any) {debugger
        var ext = fName.substring(fName.lastIndexOf('.'));
        var fNameWithoutExt = fName.split(ext)[0];
        var fNameLength = fNameWithoutExt.length;
        if (fNameLength > 17) {
          return fNameWithoutExt.substring(0, 17)+"..."+ext;
        } else {
          return fName;
        }
    }

    /**
     * This method used to scroll on top in stepper. Need to define id on top of the tag (i.e. div etc) and pass it on below method.
     * 
     * @param id 
     */
    stepperScrollTop(id:any) {
        //https://github.com/angular/components/issues/8881
        const stepElement = document.getElementById(id);
        setTimeout(() => {
          (stepElement:any)=>(scrollIntoView:any)=>({ block: 'start', inline: 'nearest', behavior: 'auto' });
        }, 250);
    }

    takeFileNamewithLength(fName:any, length:any) {
        var ext = fName.substring(fName.lastIndexOf('.'));
        var fNameWithoutExt = fName.split(ext)[0];
        var fNameLength = fNameWithoutExt.length;
        if (fNameLength > length) {
          return fNameWithoutExt.substring(0, length)+"..."+ext;
        } else {
          return fName;
        }
    }
}