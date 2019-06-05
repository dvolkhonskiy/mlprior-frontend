import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecommendedNavigationComponent} from './recommended-navigation.component';

describe('RecommendedNavigationComponent', () => {
  let component: RecommendedNavigationComponent;
  let fixture: ComponentFixture<RecommendedNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedNavigationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
