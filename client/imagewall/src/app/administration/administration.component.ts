import { ImagehandlerService } from './../display/imagehandler.service';
import { element } from 'protractor';
import { AdministrationService } from './administration.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  images: File[] = [];
  fileRequests: Observable<{}>[] = [];
  uploadSuccessful:boolean = false;
		time:number;
		settimeoutsuccess:boolean = false;
		settimeouterror:boolean = false;
  constructor(private adminService: AdministrationService, private imgHandlerService:ImagehandlerService) {
			this.imgHandlerService.getTimerInterval()
			.subscribe(res=> {
				const r = res.json();
				this.time = r.interval / 1000;
			});
		}

  ngOnInit() {
			this.adminService.getAllImages()
			.subscribe(res => {
				this.adminService.images = res.json();

			})
  }

  onChange(event) {

  }

		setInterval(time){
			this.imgHandlerService.setTimerInterval(this.time * 1000)
			.subscribe(res=> {
				this.settimeoutsuccess = true;
				setTimeout(()=>{this.settimeoutsuccess = false},5000)
			},err=>{
				this.settimeouterror = true;
				setTimeout(()=>{this.settimeouterror = false},5000)
			})
		}

		setActive(image){
			this.adminService.setActive(image)
			.subscribe(res=>{

			})
		}

		setHidden(image){
			this.adminService.setHidden(image)
			.subscribe(res=>{

				//location.reload()
		});}




}
