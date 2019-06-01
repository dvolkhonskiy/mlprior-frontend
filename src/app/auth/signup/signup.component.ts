import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    '../../app.component.css'
  ],
  providers: [
    AuthService
  ]
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
