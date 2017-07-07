import { ImagehandlerService } from './../display/imagehandler.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http'

@Injectable()
export class AdministrationService {
  images: any[] = []

		isLoading:boolean[] = [];
  constructor(private http:Http) {

  }


  getAllImages(){
			return this.http.get('http://' + environment.backendUrl + ':' + environment.backendPort + '/' + environment.imageRotatorPath + 'all')
		}

		setActive(image){
			return this.http.post('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'setactive',{filename:image})
		}

		setHidden(image){
			return this.http.post('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'sethidden',{filename:image})
		}

}
