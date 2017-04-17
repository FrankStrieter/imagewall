import { UploadService } from './upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  images: any[] = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onChange(event) {
    this.uploadService.images = this.uploadService.images.concat(event.srcElement.files);
    console.log(event.srcElement.files);
  }

}
