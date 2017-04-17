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

  @Input() src: File;
  @Output() onImageclick: EventEmitter < {} > ;
  @ViewChild('imageCanvas') canvasRef;
  constructor(private sanitizer: DomSanitizer) {
    this.onImageclick = new EventEmitter < {} > ();
    this.loading = true;
    this.image = this.src;
    console.log(this.src);
  }

  ngOnInit() {

  }

  ngOnChanges() {
    //this.src = '../../../../assets/DSC_0055.jpg';
    console.log(this.src);
    this.fr = new FileReader();
    this.fr.readAsDataURL(this.src);
    console.log(this.fr.result);
    let canvas = this.canvasRef.nativeElement;
    let context = canvas.getContext('2d');

    this.fr.onload = () => {
      this.fileReaderResult = this.fr.result;
      let source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(canvas.toDataURL());
        this.loading = false;
      };
      source.src = this.fileReaderResult;
    }
  }

  ngAfterViewInit() {}
}
