import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { ImagehandlerService } from './imagehandler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagecontainerComponent } from './imagecontainer/imagecontainer.component';
import { DisplayComponent } from './display.component';
import { CardwallComponent } from './cardwall/cardwall.component';
import { CardComponent } from './cardwall/card/card.component';



const routes: Routes = [
  { path: '', component: DisplayComponent },

];

@NgModule({
  imports: [
    CommonModule,
				RouterModule.forChild(routes)
  ],
  declarations: [ImagecontainerComponent, DisplayComponent, CardwallComponent, CardComponent],
		providers: [ImagehandlerService],
		exports:[ImagecontainerComponent]
})
export class DisplayModule { }
