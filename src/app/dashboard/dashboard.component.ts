import { Component, OnInit } from '@angular/core';
import {APIService} from '../api.service';
import {ActivatedRoute, Params, Route} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(private apiService: APIService, private route: ActivatedRoute) { }

  ngOnInit() {
    let data = this.apiService.getStats();
    console.log(data);

  }

}
