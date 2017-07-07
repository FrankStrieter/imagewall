import { ImagehandlerService } from './../display/imagehandler.service';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AdminPreviewImageComponent } from './preview/preview-image/admin-image.component';
import { AdminPreviewComponent } from './preview/admin-preview.component';
import { AdministrationService } from './administration.service';
import { AdministrationComponent } from './administration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: AdministrationComponent },

];

@NgModule({
  imports: [
    CommonModule,
				FormsModule,
				RouterModule.forChild(routes)
  ],
  declarations: [AdministrationComponent, AdminPreviewComponent,AdminPreviewImageComponent],
		providers:[AdministrationService, ImagehandlerService]
})
export class AdministrationModule { }
