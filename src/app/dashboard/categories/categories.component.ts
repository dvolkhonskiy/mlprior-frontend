import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';

import { CountryInfo, DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    DashboardDataService
  ]
})
export class CategoriesComponent {


  countriesInfo: CountryInfo[];

  constructor(service: DashboardDataService) {
    this.countriesInfo = service.getCountriesInfo();
  }

  customizeTooltip(arg: any) {
    return {
      text: arg.percentText + ' - ' + arg.valueText
    };
  }

}
