import { ImagehandlerService } from './imagehandler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
		height = '100%';
  constructor(private imgHandler:ImagehandlerService) { }

  ngOnInit() {
			var h = window.innerHeight
		||+ document.documentElement.clientHeight
		|| + document.body.clientHeight;
		this.height = h + 'px';
  }

		fadeOutDone(event){
			console.log('done');
		}

}
