import { ImagehandlerService } from './../imagehandler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-cardwall',
  templateUrl: './cardwall.component.html',
  styleUrls: ['./cardwall.component.css']
})
export class CardwallComponent implements OnInit, OnDestroy {
	height:string;
  constructor(private imgHandlerService:ImagehandlerService) {

		 }

  ngOnInit() {
			this.imgHandlerService.addCard();

  }
		ngOnDestroy(){
				this.imgHandlerService.cards= [];

		}
}
