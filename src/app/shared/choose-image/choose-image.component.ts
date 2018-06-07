import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.css']
})
export class ChooseImageComponent implements OnChanges {

  @Input() listImages;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
