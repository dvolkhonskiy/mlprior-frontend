import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';

import { DashboardDataService } from '../dashboard-data.service';
import {APIService} from "../../shared/api.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [
    DashboardDataService
  ]
})
export class CategoriesComponent implements OnInit {

  resolutionKeys: string[] = ['Month', 'Quarter', 'Half', 'Year'];
  resolutions = { Month: 1, Quarter: 3, Half: 6, Year: 12};
  resIdx = 'Year';
  categoryInfo;
  visualRange;

  categories = new FormControl();
  categoriesList: string[] = ['Artificial Intelligence',
  'Hardware Architecture',
  'Computational Complexity',
  'Computational Engineering, Finance, and Science',
  'Computational Geometry',
  'Computation and Language',
  'Cryptography and Security',
  'Computer Vision and Pattern Recognition',
  'Computers and Society',
  'Databases',
  'Distributed, Parallel, and Cluster Computing',
  'Digital Libraries',
  'Discrete Mathematics',
  'Data Structures and Algorithms',
  'Emerging Technologies',
  'Formal Languages and Automata Theory',
  'General Literature',
  'Graphics',
  'Computer Science and Game Theory',
  'Human-Computer Interaction',
  'Information Retrieval',
  'Information Theory',
  'Learning',
  'Logic in Computer Science',
  'Multiagent Systems',
  'Multimedia',
  'Mathematical Software',
  'Numerical Analysis',
  'Neural and Evolutionary Computing',
  'Networking and Internet Architecture',
  'Other Computer Science',
  'Operating Systems',
  'Performance',
  'Programming Languages',
  'Robotics',
  'Symbolic Computation',
  'Sound',
  'Software Engineering',
  'Social and Information Networks',
  'Systems and Control'];
  
  
  mapping = {
    'Artificial Intelligence': 'cs.AI',
    'Hardware Architecture': 'cs.AR',
    'Computational Complexity': 'cs.CC',
    'Computational Engineering, Finance, and Science': 'cs.CE',
    'Computational Geometry': 'cs.CG',
    'Computation and Language': 'cs.CL',
    'Cryptography and Security': 'cs.CR',
    'Computer Vision and Pattern Recognition': 'cs.CV',
    'Computers and Society': 'cs.CY',
    'Databases': 'cs.DB',
    'Distributed, Parallel, and Cluster Computing': 'cs.DC',
    'Digital Libraries': 'cs.DL',
    'Discrete Mathematics': 'cs.DM',
    'Data Structures and Algorithms': 'cs.DS',
    'Emerging Technologies': 'cs.ET',
    'Formal Languages and Automata Theory':  'cs.FL',
    'General Literature': 'cs.GL',
    'Graphics': 'cs.GR',
    'Computer Science and Game Theory': 'cs.GT',
    'Human-Computer Interaction': 'cs.HC',
    'Information Retrieval': 'cs.IR',
    'Information Theory': 'cs.IT',
    'Learning': 'cs.LG',
    'Logic in Computer Science': 'cs.LO',
    'Multiagent Systems': 'cs.MA',
    'Multimedia': 'cs.MM',
    'Mathematical Software': 'cs.MS',
   'Numerical Analysis':  'cs.NA',
    'Neural and Evolutionary Computing': 'cs.NE',
    'Networking and Internet Architecture': 'cs.NI',
    'Other Computer Science': 'cs.OH',
    'Operating Systems': 'cs.OS',
    'Performance': 'cs.PF',
    'Programming Languages': 'cs.PL',
    'Robotics': 'cs.RO',
    'Symbolic Computation': 'cs.SC',
    'Sound': 'cs.SD',
    'Software Engineering': 'cs.SE',
    'Social and Information Networks': 'cs.SI',
    'Systems and Control': 'cs.SY',
  };

  isLoading = true;

  constructor(public apiService: APIService, private service: DashboardDataService) {
  }


  fetchCategories(categories) {
    const shortCategories = [];
    for (const item of categories) {
      shortCategories.push(this.mapping[item]);
    }

    this.apiService.getCategories(shortCategories.toString()).subscribe(
      data => {
        this.categoryInfo = data['data'];
        this.isLoading = false;
      },
      error => {
        console.error('couldn\'t post because', error);
        this.isLoading = false;
      }
    );
  }

  ngOnInit() {
    this.fetchCategories('');

    this.categories.valueChanges.subscribe(
      value => {
        console.log(value);
        this.fetchCategories(value);
      }

    );
  }



}
