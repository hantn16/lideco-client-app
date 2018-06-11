import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.css']
})
export class ChooseImageComponent implements OnChanges {

  @Input() listImages;
  constructor(private _dataService: DataService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getListImages();
  }
  getListImages() {
    return this._dataService.get('images').subscribe(list => this.getImage(list));
  }
  getImage = (image) => {
    return this._dataService.get(`image/${image.id}`).subscribe();
  }
}
