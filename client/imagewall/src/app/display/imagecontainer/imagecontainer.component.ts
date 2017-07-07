import {
	environment
} from './../../../environments/environment';
import {
	ImagehandlerService
} from './../imagehandler.service';
import {
	Component,
	OnInit,
	ViewChild,
	Input,
	OnDestroy
} from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'

@Component({
	selector: 'app-imagecontainer',
	templateUrl: './imagecontainer.component.html',
	styleUrls: ['./imagecontainer.component.css'],
	animations: [
		trigger('vChanged', [
			state('out', style({
				opacity: 0
			})),
			state('in', style({
				opacity: 1
			})),
			transition('in => out', animate('300ms')),
			transition('out => in', animate('500ms'))
		])
	]
})
export class ImagecontainerComponent implements OnInit, OnDestroy {
	image: any;
	context: any;
	animationsSubscription: any;

	fadeOut: boolean;

	@ViewChild('imageCanvas') canvasRef;
	@ViewChild('imageElement') imageElement;
	visibilityChanged: string;
	@Input() isActive: boolean;
	canvas: any;
isFirstImage = false;
	constructor(private imageService: ImagehandlerService) {


		this.visibilityChanged = this.isActive ? 'in' : 'out';
		this.animationsSubscription = imageService.toggleAnimation
			.subscribe(value => {
				console.log(this.isActive);
				console.log(this.visibilityChanged);
				if (this.isActive) {
					this.visibilityChanged = 'out';
					//this.getNextimage();
					this.isActive = false; //fadeoutComponen
					;
				} else {
					this.isActive = true;
					this.visibilityChanged = 'in'
				}
			});
			this.getNextimage();
	}

	ngOnInit() {
		this.canvas = this.canvasRef.nativeElement;
		this.context = this.canvas.getContext('2d');
		if(this.isActive){
			this.isFirstImage = true;
		}
		//this.getNextimage();
	}

	ngOnDestroy() {
		this.animationsSubscription.unsubscribe();
	}

	fadeOutDone(event) {
		if (!this.isActive) {
			this.getNextimage()
		}
	}
	getNextimage() {
		this.imageService.getTimerInterval()
			.flatMap(res => {
				const r = res.json();
					this.imageService.changeInterval(r.interval, r.interval);

				return this.imageService.getQueueLength()
			})
			.flatMap(res => {
				var r = res.json();
				this.imageService.queueLength = r.length;
				if (this.imageService.queueLength > 9) {
					console.log(this.imageService.queueLength);
					this.imageService.viewCards = true;
				}
				return this.imageService.getNextImage();
			})
			.subscribe(res => {

				this.image = 'http://' + environment.backendUrl + ':' + environment.backendPort + environment.imagePath + encodeURIComponent(res['_body']);
				//console.log(this.image['_body'])
				let source = new Image();
				source.crossOrigin = 'Anonymous';
				source.onload = () => {
					var rect = this.canvas.parentNode.getBoundingClientRect();
					const ratio = source.width / source.height;
					this.canvas.height = rect.height;
					this.canvas.width = this.canvas.height * ratio;
					this.context.drawImage(source, 0, 0, this.canvas.width, this.canvas.height);
					if(this.isFirstImage){
						this.visibilityChanged = 'in';
						this.isFirstImage = false;
					}
				};
				source.onerror = (err) => {
					console.log(err)
					// ... probably want to handle this
				};
				source.src = 'http://' + environment.backendUrl + ':' + environment.backendPort + environment.imagePath + encodeURIComponent(res['_body']);
			});
	}

}
