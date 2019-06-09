import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthResponseData} from '../auth/auth.service';
import {APIService} from '../shared/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  isSuccess = false;

  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const name = form.value.name;
    const message = form.value.text;

    let authObs: Observable<AuthResponseData>;

    this.apiService.sendFeedback(message, name, email, 2).subscribe(
      data => {
        this.isSuccess = true;
      },
      error => {
        console.error(error);
      }
    );
    form.reset();
  }

}
