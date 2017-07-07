import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SuiModule} from 'ng2-semantic-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'upload', loadChildren: '../app/upload/upload.module#UploadModule' },
  { path: 'display', loadChildren: '../app/display/display.module#DisplayModule'},
		{ path: 'administration',loadChildren: '../app/administration/administration.module#AdministrationModule'},
  { path: '**', redirectTo: 'upload'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
					BrowserAnimationsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
		exports: [BrowserAnimationsModule]
})

export class AppModule { }
