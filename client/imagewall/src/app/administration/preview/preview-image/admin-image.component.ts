import { environment } from './../../../../environments/environment';
import { AdministrationService } from './../../administration.service';
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
  templateUrl: './admin-image.component.html',
  styleUrls: ['./admin-image.component.css']
})

export class AdminPreviewImageComponent implements OnInit, OnChanges {
  image: SafeResourceUrl;
  loading: boolean;
  fr: FileReader
  fileReaderResult;
		canvas:any;
		context:any;

  @Input() src: any;
  @Output() onImageclick: EventEmitter < {} > ;
  @ViewChild('imageCanvas') canvasRef;
  constructor(private sanitizer: DomSanitizer,private adminService:AdministrationService) {
    this.onImageclick = new EventEmitter < {} > ();
    this.loading = true;
    this.image = this.src;

  }

  ngOnInit() {
				this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

		setHidden(image){

			this.adminService.setHidden(image)
			.subscribe(res=>{
				this.adminService.images.find(r=> r.file === image).isvisible = false;
				//location.reload();
			});
		}

		setActive(image){

			this.adminService.setActive(image)
			.subscribe(res=>{
				this.adminService.images.find(r=> r.file === image).isvisible = true;
			});
		}

  ngOnChanges() {
    //this.src = '../../../../assets/DSC_0055.jpg';

    this.fr = new FileReader();

				const imagePath =   this.src.isvisible ? environment.imagePath : environment.hiddenimagePath

    this.image = 'http://' + environment.backendUrl +':'+environment.backendPort + imagePath +  encodeURIComponent(this.src.file);

				//console.log(this.image['_body'])
    let source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
						var rect = this.canvas.parentNode.getBoundingClientRect();
						const ratio = source.width / source.height;
						this.canvas.height = rect.height;
						this.canvas.width = this.canvas.height * ratio;
      this.context.drawImage(source, 0, 0,	this.canvas.width,	this.canvas.height);
						this.loading = false;
      };
						source.onerror = (err) => {
							this.loading = false;
				  console.log(err)
						// ... probably want to handle this
				};
      source.src = 'http://' + environment.backendUrl +':'+environment.backendPort + imagePath +  encodeURIComponent(this.src.file);
			}
  }

