import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css', '../../app.component.css']
})
export class NavigationComponent implements OnInit {
  isLibrary: boolean = false;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {  }

}
