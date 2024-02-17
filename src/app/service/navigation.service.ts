// navigation.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private pageChangeSubject = new Subject<string>();
  
  pageChange$ = this.pageChangeSubject.asObservable();

  notifyPageChange(page: string) {
    this.pageChangeSubject.next(page);
  }
}
