import { element } from 'protractor';
import { UploadService } from './upload.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  images: File[] = [];
  fileRequests: Observable<{}>[] = [];
  uploadSuccessful:boolean = false;
		success:boolean = false
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onChange(event) {
			this.uploadSuccessful = false;
    //this.uploadService.images = this.uploadService.images.concat(event.srcElement.files);
    Array.prototype.forEach.call(event.srcElement.files, element => {
      this.uploadService.images.push(element);
    });
  }

  uploadImages() {
			this.uploadSuccessful = false;
    this.fileRequests = [];
    this.uploadService.images.forEach(element => {
					console.log(element);
      this.fileRequests.push(this.uploadService.makeFileRequest(element));
    });
    console.log(this.fileRequests);
    Observable.forkJoin(this.fileRequests)
    .subscribe(res=> {
						this.uploadSuccessful = true;
      this.images = [];
						this.uploadService.images = [];
    });
  }

}
