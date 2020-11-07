import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigatorLevel} from '../models/navigator-level';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url: string = 'assets/data.json';
  private _dataMap: Map<number, NavigatorLevel> = new Map();
  private readonly _firstLevelIndexes: number[] = [1, 2, 3];

  constructor(private httpClient: HttpClient) {
  }

  public getRowChildren(childrenIds: number[] = this._firstLevelIndexes) {
    return new Promise((resolve) => {
      const children: Map<number, NavigatorLevel> = new Map();

      // if (!this._dataMap.size) {
      return this.fetchData().subscribe((data: Map<number, NavigatorLevel>) => {
        this._dataMap = data;
        childrenIds.forEach((childId: number) => children.set(childId, data[childId]));
        resolve(children);
      });
      // } else {
      //   childrenIds.forEach((childId: number) => children.set(childId, this._dataMap[childId]));
      //   resolve(children);
      // }
    });


    // const children: Map<number, NavigatorLevel> = new Map();
    // if (!this._dataMap.size) {
    //   await this.fetchData().then((data: Map<number, NavigatorLevel>) => {
    //     this._dataMap = data;
    //   });
    // }
    //
    // return new Promise((resolve) => {
    //   childrenIds.forEach((childId: number) => children.set(childId, this._dataMap[childId]));
    //   resolve(children);
    // });
  }

  private fetchData() {
    console.log('שלפתי');
    return this.httpClient.get(this._url);
  }
}
