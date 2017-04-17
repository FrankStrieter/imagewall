import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SuiModule} from 'ng2-semantic-ui';

const routes: Routes = [
  { path: 'upload', loadChildren: '../app/upload/upload.module#UploadModule' },
  { path: 'display', loadChildren: '../app/display/display.module'},
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
    RouterModule.forRoot(routes)
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})

export class AppModule { }
