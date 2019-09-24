import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {APIService} from '../../shared/api.service';

@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.css']
})
export class RequestDemoComponent implements OnInit {
  public errors: any = [];
  favoriteFeature: string;
  features: string[] = ['Citation suggestions', 'Formulas analysis', 'Scientific Writing', 'Fit to conference / journal template', 'Acceptance Prediction'];
  isLoading = false;
  submitted = false;

  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const name = form.value.name;
    const text = form.value.text;
    if (! this.favoriteFeature) {
      this.errors.push('Please select the feature of interest');
      return;
    }

  // # 1 -- Not cited
  // # 2 -- Formulas
  // # 3 -- Skipped parts
  // # 4 -- Fit to a conference
  // # 5 -- Acceptance prediction

    const feature = this.features.indexOf(this.favoriteFeature);
    this.isLoading = true;
    this.apiService.sendRequestDemo(name, email, feature, text).subscribe(
      data => {
        this.submitted = true;
        this.isLoading = false;
        console.log(data);
      },
      error1 => {
        console.log(error1);
        this.submitted = true;
        this.isLoading = false;
        this.errors = [];
      }
    );


  }

}
