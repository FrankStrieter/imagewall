import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {
  images: File[] = []
  uploadProgress: any[] = [];
		isLoading:boolean[] = [];
  constructor() {

  }

  makeFileRequest (imageFile:File):Observable<{}> {
    return Observable.create(observer => {

      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
								this.isLoading[imageFile.name] = true;


      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
          if (xhr.status === 201) {
											this.isLoading[imageFile.name] = false;
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.uploadProgress[imageFile.name] = Math.round(event.loaded / event.total * 100);
								console.log(imageFile,this.uploadProgress[imageFile.name]);
      };

      xhr.open('POST','http://'+ environment.backendUrl +':'+environment.backendPort+ environment.uploadPath, true);
						xhr.setRequestHeader('enctype','multipart/form-data');
						formData.append("imageFile", imageFile);
						console.log(formData);
      xhr.send(formData);
    });
  }

}
