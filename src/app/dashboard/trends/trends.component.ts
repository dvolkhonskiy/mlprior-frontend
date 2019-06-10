import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxSelectBoxModule, DxRangeSelectorModule } from 'devextreme-angular';
import { DashboardDataService } from '../dashboard-data.service';
import {APIService} from '../../shared/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  providers: [
    DashboardDataService
  ]
})


export class TrendsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Deep Learning', 'Generative Adversarial Networks' ];
  allFruits: string[] = [
    'Deep Learning',
    'Generative Adversarial Networks',
    'Convolutional', 'LSTM', '3D',
    'Attention Mechanism'
  ];

  @ViewChild('fruitInput', {read: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {read: false}) matAutocomplete: MatAutocomplete;

  resolutionKeys: string[] = ["Month", "Quarter", "Half", "Year"];
  resolutions = { "Month": 1, "Quarter": 3, "Half": 6, "Year": 12};
  resIdx = "Year";
  trendInfo;
  visualRange;
  isLoading = true;


  constructor(public apiService: APIService, private service: DashboardDataService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit() {
    this.fetchTrends('');
  }

  fetchTrends(keywords: string) {
    this.isLoading = true;
    this.apiService.getTrends(keywords).subscribe(
      data => {
        this.trendInfo = data.data;
        this.isLoading = false;
      },
      error =>  {
        console.log(error);
        this.isLoading = false;
      }
    );
  }




  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }

    this.fetchTrends(this.fruits.toString());


  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    this.fetchTrends(this.fruits.toString());
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}


