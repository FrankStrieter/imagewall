import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Injectable()
export class ImagehandlerService {
	toggleAnimation: EventEmitter<string> = new EventEmitter<string>()
	queueLength:number = 0;
	cards:number[] = [];
	timer:Observable<number> = null;
	timerSubscription:any;
	interval:number = 25000;
	viewCards: boolean = false;
  constructor(private http: Http) {
					this.timer = TimerObservable.create(2000, this.interval);
    	this.timerSubscription = this.timer.subscribe(t=>{
						console.log(t)
						this.requestFadeOut();
			});

		 }



			addCard(){
				this.cards.push(this.cards.length);
			}

			changeInterval(duration, interval){

				this.interval = interval;

				this.timerSubscription.unsubscribe();
				this.timer =  TimerObservable.create(duration, interval);
    	this.timerSubscription = this.timer.subscribe(t=>{
						this.requestFadeOut();

			})

			}

		requestFadeOut(){
				this.toggleAnimation.emit('out');
		}

		requestFadeIn(){
			this.toggleAnimation.emit('in');
		}

  getNextImage() {
			console.log('http://' + environment.backendUrl + ':' + environment.backendPort + environment.imagePath + 'next')
   return this.http.get('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'nexturl');
  }

		getQueueLength() {
			//console.log('http://' + environment.backendUrl + ':' + environment.backendPort + environment.imagePath + 'next')
   return this.http.get('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'length');
  }

		getTimerInterval(){
			return this.http.get('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'interval')
		}

		setTimerInterval(time){
			return this.http.post('http://' + environment.backendUrl + ':' + environment.backendPort +'/'+ environment.imageRotatorPath + 'setinterval', {interval:time})
		}
}
