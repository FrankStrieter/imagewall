import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  images: any[];
  constructor(private uploadService: UploadService) {
   }

  ngOnInit() {
  }

}
