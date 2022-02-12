import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.css'],
})
export class SearchControlComponent implements OnInit {
  constructor() {}

  @Input() searchModel: any;

  @Output() searchModelChange: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  updateSearchModel(value: any) {
    this.searchModel = value;
    this.searchModelChange.emit(this.searchModel);
  }
}
