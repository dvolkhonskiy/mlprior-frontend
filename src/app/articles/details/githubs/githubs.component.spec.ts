import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubsComponent } from './githubs.component';

describe('GithubsComponent', () => {
  let component: GithubsComponent;
  let fixture: ComponentFixture<GithubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
