import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule, DxRangeSelectorModule } from 'devextreme-angular';
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

  resolution_keys: string[] = ["Month", "Quarter", "Half", "Year"];
  resolutions = { "Month": 1, "Quarter": 3, "Half": 6, "Year": 12};
  res_idx = "Year";
  trendInfo;


  constructor(public apiService: APIService, private service: DashboardDataService) {
  }

  ngOnInit() {
    this.apiService.getTrends('A, The, Of, In, On, Into', this);
  }

}


