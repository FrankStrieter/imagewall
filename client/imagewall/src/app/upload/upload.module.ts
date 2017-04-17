import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { PreviewComponent } from './preview/preview.component';
import { PreviewImageComponent } from './preview/preview-image/preview-image.component';

const routes: Routes = [
  { path: '', component: UploadComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadComponent, PreviewComponent, PreviewImageComponent]
})
export class UploadModule { }
