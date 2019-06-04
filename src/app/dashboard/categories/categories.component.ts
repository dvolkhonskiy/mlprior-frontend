import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';

import { DashboardDataService } from '../dashboard-data.service';
import {APIService} from "../../api.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    DashboardDataService
  ]
})
export class CategoriesComponent implements OnInit {

  resolution_keys: string[] = ["Month", "Quarter", "Half", "Year"];
  resolutions = { "Month": 1, "Quarter": 3, "Half": 6, "Year": 12};
  res_idx = "Year";
  categoryInfo;

  constructor(public apiService: APIService, private service: DashboardDataService) {
  }

  ngOnInit() {
    this.apiService.getCategories("cs.AI, cs.CV, cs.DS, cs.IR", this);
  }

}
