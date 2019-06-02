import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { ArchitectureInfo, DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  providers: [
    DashboardDataService
  ]
})
export class TrendsComponent implements OnInit {

  types: string[] = ["spline", "stackedspline", "fullstackedspline"];
  architecturesInfo: ArchitectureInfo[];

  constructor(private service: DashboardDataService) {
    this.architecturesInfo = service.getArchitecturesInfo();
  }

  ngOnInit() {
  }

}
