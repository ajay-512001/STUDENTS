import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LodingSpinnerService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {//console.log("start "+this.count);
      this.spinner$.next('start');
  }

  requestEnded() {//console.log("end "+this.count);
      this.spinner$.next('stop');
  }

  resetSpinner() {//console.log("reset "+this.count);
  this.spinner$.next('stop');
}

}
