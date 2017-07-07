import { environment } from './../../../../environments/environment';
import { ImagehandlerService } from './../../imagehandler.service';
import {
	Component,
	OnInit,
	OnDestroy,
    ViewChild,
Input
} from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	animation,
	AnimationBuilder
} from '@angular/animations';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css'],
	animations: [
		trigger('vChanged', [
			state('out', style({
				opacity: 0
			})),
			state('in', style({
				opacity: 1
			})),
			transition('* => in', animate('300ms')),
			transition('* => out', animate('500ms'))
		])
	]
})
export class CardComponent implements OnInit, OnDestroy {
	shrinkanimation:any;
	duration:number = 3000;
	trigger:string;
	image:any;
	canvas:any;
	context:any;
	borderStyle="none";
	animationsSubscription:any;
	clientheight = '100%';
	fadeOut:boolean;

	@ViewChild('imageCanvas') canva
		@ViewChild('imageCanvas') canvasRef;
		@ViewChild('divRef') divRef;
	@ViewChild('imageElement') imageElement;
	@Input() number;
	constructor(private builder: AnimationBuilder, private imageService: ImagehandlerService) {


		this.clientheight =''+ window.innerHeight
		|| '' + document.documentElement.clientHeight
		|| '' + document.body.clientHeight;
		this.clientheight = this.clientheight + 'px';
		this.getNextimage();
		this.animationsSubscription = imageService.toggleAnimation
				.subscribe(value => {

					console.log('triggered:',this.trigger);
					console.log(this.imageService.cards.length);
					console.log('number',this.number,'first',''+this.imageService.cards[0]);
					if(this.trigger === 'in'){
						this.trigger='shrink';
						this.shrinkanimation.play();
						this.borderStyle ='6px solid white';
					} else if(this.trigger === 'shrink'){
						if(this.imageService.queueLength > 0){
						this.imageService.addCard();
						this.trigger = 'paused';
						} else{
								this.imageService.cards=[];
							this.imageService.viewCards = false;

						}
						} else if(this.trigger === 'paused' && this.imageService.cards.length > 15 && this.number == this.imageService.cards[0]){
							this.imageService.cards.shift();
							console.log('delete');
							//this.trigger = 'out';
						}
				})
	}

	ngOnDestroy(){
		console.log('destroyed');
		this.animationsSubscription.unsubscribe();
	}

	ngOnInit() {
		this.canvas = this.canvasRef.nativeElement;
   this.context = this.canvas.getContext('2d');
			this.context.imageSmoothingEnabled = false;
   this.context.webkitImageSmoothingEnabled = false;
   this.context.mozImageSmoothingEnabled = false;
	}

	shrink(duration: number, top: number,left:number, rotation: number, width: number) {
		const definition = this.builder.build([
			animate(duration, style({
				left: left,
				top: top + 'px',
				transform: 'rotate(' + rotation + 'deg)',
				width: width + '%',
				height: width+'%',
				blur:0.2
			}))

		])
		const shrinkanimation = definition.create(this.divRef.nativeElement, {});
		return shrinkanimation;
	}

		getTop(){
			var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
			return height * 0.7 * Math.random();
		}

		getLeft(){
			var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
			return width * 0.7 * Math.random();
		}

		getRotation(){

			return -20 + (40 * Math.random()); //[-20 to 20]
		}

		getWidth(){
			return 30 + (20 * Math.random()); //[30 to 50]
		}

		triggerDone(){
			if(this.trigger==='out'){

			}
		}

		getNextimage() {
			this.imageService.getTimerInterval()
			.flatMap(res => {
				const r = res.json()
				this.imageService.changeInterval(r.interval / 2, r.interval / 2);
				return this.imageService.getQueueLength()
			})
			.flatMap(res =>{
				var r = res.json();
				this.imageService.queueLength = r.length;
				console.log(res);
				return this.imageService.getNextImage();
			} )
			.subscribe(res => {
				console.log(res);
				this.image = 'http://' + environment.backendUrl +':'+ environment.backendPort+environment.imagePath+   encodeURIComponent(res['_body']);
				//console.log(this.image['_body'])
    let source = new Image();
      source.crossOrigin = 'Anonymous';
      source.onload = () => {

						var rect = this.canvas.parentNode.getBoundingClientRect();
						const ratio = source.width / source.height;
						this.canvas.height = rect.height;
						this.canvas.width = this.canvas.height * ratio;
      this.context.drawImage(source, 0, 0,	this.canvas.width,	this.canvas.height);
						this.shrinkanimation = this.shrink(this.duration,this.getTop(),this.getLeft(),this.getRotation(),this.getWidth());
						setTimeout(()=>{this.trigger="in"},1000)
						;
      };
						source.onerror = (err) => {
				  console.log(err)
						// ... probably want to handle this
				};
      source.src = 'http://' + environment.backendUrl +':'+ environment.backendPort+environment.imagePath+  encodeURIComponent(res['_body']);
			});
		}


}
