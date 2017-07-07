import { UploadService } from './../../upload.service';
//import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
//import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser/public_api";
//import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser/platform-browser";
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css']
})

export class PreviewImageComponent implements OnInit, AfterViewInit, OnChanges {
  image: SafeResourceUrl;
  loading: boolean;
  fr: FileReader
  fileReaderResult;
		canvas:any;
		context:any;

  @Input() src: File;
  @Output() onImageclick: EventEmitter < {} > ;
  @ViewChild('imageCanvas') canvasRef;
  constructor(private sanitizer: DomSanitizer,private uploadService:UploadService) {
    this.onImageclick = new EventEmitter < {} > ();
    this.loading = true;
    this.image = this.src;
    console.log(this.src);
  }

  ngOnInit() {
				this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngOnChanges() {
    //this.src = '../../../../assets/DSC_0055.jpg';
    console.log(this.src);
    this.fr = new FileReader();
    this.fr.readAsDataURL(this.src);
    console.log(this.fr.result);


    this.fr.onload = () => {
      this.fileReaderResult = this.fr.result;
      let source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
							var rect = this.canvas.parentNode.getBoundingClientRect();
							console.log(rect);
						 const ratio = source.width / source.height;
							console.log('ratio', ratio);
						 this.canvas.height = rect.height;
						 this.canvas.width = this.canvas.height * ratio;
        this.context.drawImage(source, 0, 0, this.canvas.width, this.canvas.height);
        //this.image = this.sanitizer.bypassSecurityTrustResourceUrl(this.canvas.toDataURL());
        this.loading = false;
      };
      source.src = this.fileReaderResult;
    }
  }

  ngAfterViewInit() {}
}
