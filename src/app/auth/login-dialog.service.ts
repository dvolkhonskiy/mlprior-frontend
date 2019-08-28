import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UserProfile, User} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TrackingService} from '../shared/tracking.service';
import {APIService} from '../shared/api.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from './login.component';
import {AuthService} from './auth.service';

interface UserResponse {
  email: string;
  token: string;
}

export interface AuthResponseData {
  user: UserResponse;
}

@Injectable()
export class LoginDialogService implements OnInit, OnDestroy {

  constructor(
              private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

  openDialog(next?: any[]) {
    // if (this.dialog.getDialogById())/
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.id = 'login';
    dialogConfig.data = {};

    if (next) {
      dialogConfig.data['next'] = next;
    }
    this.dialog.open(LoginComponent, dialogConfig);
  }

  closeDialogWindow() {
    this.dialog.getDialogById('login').close();
  }



}
