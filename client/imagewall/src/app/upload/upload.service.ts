import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UploadService {
  images: File[] = []
  uploadProgress: any;
  constructor() {

  }

  makeFileRequest (imageFile:File):Observable<{}> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

        formData.append("imageFile", imageFile);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.uploadProgress = Math.round(event.loaded / event.total * 100);
      };

      xhr.open('POST', environment.backendUrl + environment.uploadPath, true);
      xhr.send(formData);
    });
  }

}
