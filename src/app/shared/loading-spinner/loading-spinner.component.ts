import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template:
    '<div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-wedges"><div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {}
