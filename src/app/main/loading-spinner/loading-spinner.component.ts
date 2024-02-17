import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LodingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  showSpinner = false;

  constructor(private lodingSpinnerService: LodingSpinnerService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {debugger
    this.init();
  }

  init() {debugger
    this.lodingSpinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }
}
