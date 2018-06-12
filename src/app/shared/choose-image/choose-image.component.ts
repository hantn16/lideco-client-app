import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.css']
})
export class ChooseImageComponent implements OnChanges, OnInit {


  @Input() listImages: any[];
  constructor(private _dataService: DataService) { }
  ngOnInit(): void {
    this.getListImages();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.showListImages(this.listImages);
  }
  getListImages() {
    this._dataService.get('images').subscribe(list => this.listImages = list);
  }
  showImage = (image) => {
    return this._dataService.get(`image/${image.id}`).subscribe();
  }
  showListImages = (list: any[]) => {
    list.forEach((item) => {
      this.showImage(item);
    });
  }
}
