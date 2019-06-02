import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { DashboardDataService } from '../dashboard-data.service';
import {APIService} from "../../api.service";

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  providers: [
    DashboardDataService
  ]
})
export class TrendsComponent implements OnInit {

  resolutions: string[] = ["Month", "Quater", "Half", "Year"];
  trendInfo;
  seriesOptions;
  resolution;
  resolutionName;


  constructor(public apiService: APIService, private service: DashboardDataService) {
  }

  ngOnInit() {
    this.apiService.getTrends("A, The, In, Of", 6, this);

    //this.apiService.seriesOptions;
  }

}
