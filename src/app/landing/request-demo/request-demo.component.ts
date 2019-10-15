import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {APIService} from '../../shared/api.service';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FileUploadModel} from '../acceptance/acceptance.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.css']
})
export class RequestDemoComponent implements OnInit {
  public errors: any = [];
  favoriteFeature: string;
  features: string[] = [
    'Citation suggestions',
    'Formulas consistency',
    'Scientific Writing improvements',
    'Fit to conference / journal template'];
  isLoading = false;
  submitted = false;

  private files: Array<FileUploadModel> = [];

  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = environment.baseUrl + 'api/upload';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
   By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  constructor(
    private apiService: APIService,
    private _http: HttpClient,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.text === '') {
      this.errors = [];
      this.errors.push('Please enter your request');
      return;
    }

    if (form.value.name === '') {
      this.errors = [];
      this.errors.push('Please enter your name');
      return;
    }

    if (form.value.email === '') {
      this.errors = [];
      this.errors.push('Please enter your email');
      return;
    }

    const email = form.value.email;
    const name = form.value.name;
    const request = form.value.text;



    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true });
      }
      this.uploadFiles(email, name, request);
    };
    fileUpload.click();


  // # 1 -- Not cited
  // # 2 -- Formulas
  // # 3 -- Skipped parts
  // # 4 -- Fit to a conference
  // # 5 -- Acceptance prediction

    // const feature = this.features.indexOf(this.favoriteFeature) + 1;

    // this.apiService.sendRequestDemo(name, email, feature, text).subscribe(
    //   data => {
    //     this.submitted = true;
    //     this.isLoading = false;
    //     console.log(data);
    //   },
    //   error1 => {
    //     console.log(error1);
    //     this.submitted = true;
    //     this.isLoading = false;
    //     this.errors = [];
    //   }
    // );

  }


  private uploadFile(file: FileUploadModel, email: string, name: string, request: string) {
    const fd = new FormData();
    fd.append(this.param, file.data);
    fd.append('info', email);
    fd.append('name', name);
    fd.append('request', request);

    const req = new HttpRequest('POST', this.target, fd);

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => {console.log(message); }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
          this.isLoading = false;
          this.errors = [];
          this.submitted = true;
        }
      }
    );
  }

  private uploadFiles(email: string, name: string, request: string) {
    this.isLoading = true;
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file, email, name, request);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}
