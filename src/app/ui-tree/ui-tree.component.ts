import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NavigatorLevel} from '../models/navigator-level';

@Component({
  selector: 'app-ui-tree',
  templateUrl: './ui-tree.component.html',
  styleUrls: ['./ui-tree.component.less']
})
export class UiTreeComponent implements OnInit {

  private _data: Map<number, NavigatorLevel> = new Map<number, NavigatorLevel>();
  constructor(private _apiService: ApiService) {
  }

  get data(): Map<number, NavigatorLevel> {
    return this._data;
  }

  set data(value: Map<number, NavigatorLevel>) {
    this._data = value;
  }

  ngOnInit(): void {
    this._apiService.getRowChildren().then((connections: Map<number, NavigatorLevel>) => {
      this._data = connections;
    });
  }
}
