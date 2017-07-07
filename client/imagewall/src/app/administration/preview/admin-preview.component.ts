import { AdministrationService } from './../administration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './admin-preview.component.html',
  styleUrls: ['./admin-preview.component.css']
})
export class AdminPreviewComponent implements OnInit {
  images: any[];
  constructor(private adminService: AdministrationService) {
   }

  ngOnInit() {
  }

}
