import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
  images: any[] = []
  constructor() {
    this.images.push('../../../../assets/DSC_0055.jpg');
    this.images.push('../../../../assets/Foto0156.jpg');
  }

}
