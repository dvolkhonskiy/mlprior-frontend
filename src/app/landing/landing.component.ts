import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {APIService} from '../shared/api.service';
import {NgForm} from '@angular/forms';
import {LoginDialogService} from '../auth/login-dialog.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [
    // '../../assets/css/style.css',
    // './landing.component.css',


    '../../assets/landing/css/bootstrap.min.css',
    '../../assets/landing/css/slicknav.css',
    '../../assets/landing/css/owl.carousel.min.css',
    '../../assets/landing/css/owl.theme.css',

    '../../assets/landing/css/magnific-popup.css',
    '../../assets/landing/css/nivo-lightbox.css',
    '../../assets/landing/css/animate.css',
    '../../assets/landing/css/main.css',
    '../../assets/landing/css/responsive.css',
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class LandingComponent implements OnInit {

  nArticles = 0;
  nBlogPosts = 0;
  nGitHubs = 0;
  isSuccess = false;

  constructor(
    private apiService: APIService,
    public loginDialog: LoginDialogService,
  ) { }

  ngOnInit() {
    this.apiService.getStats().subscribe(
      data => {
        this.nArticles = data.n_articles;
        this.nBlogPosts = data.n_blog_posts;
        this.nGitHubs = data.n_githubs;
      },
      error => console.error('couldn\'t post because', error)
    );
    // this.loadScript('../../assets/landing/js/jquery-min.js');
    // this.loadScript('../../assets/landing/js/popper.min.js');
    // this.loadScript('../../assets/landing/js/bootstrap.min.js');
    // this.loadScript('../../assets/landing/js/owl.carousel.min.js');
    // this.loadScript('../../assets/landing/js/jquery.mixitup.js');
    // this.loadScript('../../assets/landing/js/wow.js');
    // this.loadScript('../../assets/landing/js/jquery.nav.js');
    // this.loadScript('../../assets/landing/js/scrolling-nav.js');
    // this.loadScript('../../assets/landing/js/jquery.easing.min.js');
    // this.loadScript('../../assets/landing/js/jquery.counterup.min.js');
    // this.loadScript('../../assets/landing/js/nivo-lightbox.js');
    // this.loadScript('../../assets/landing/js/jquery.magnific-popup.min.js');
    // this.loadScript('../../assets/landing/js/waypoints.min.js');
    // this.loadScript('../../assets/landing/js/jquery.slicknav.js');
    // this.loadScript('../../assets/landing/js/landing.js');
    // this.loadScript('../../assets/landing/js/form-validator.min.js');
    // this.loadScript('../../assets/landing/js/contact-form-script.min.js');

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const name = form.value.name;
    const message = form.value.text;

    this.apiService.sendFeedback(message, name, email, 1).subscribe(
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
