import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigatorLevel} from '../models/navigator-level';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  private _url: string = 'assets/data.json';
  private _dataCache;
  private readonly _firstLevelIndexes: number[] = [1, 2, 3];

  public async getRowChildren(childrenIds: number[] = this._firstLevelIndexes) {
    const children: Map<number, NavigatorLevel> = new Map();
    if (!this._dataCache) {
      this._dataCache = await this.fetchData().toPromise();
    }
    childrenIds.forEach((childId: number) => children.set(childId, this._dataCache[childId]));
    return children;
  }

  private fetchData() {
    return this.httpClient.get(this._url);
  }

  // public async getRowChildren(childrenIds: number[] = this._firstLevelIndexes) {
  //   const children: Map<number, NavigatorLevel> = new Map();
  //
  //   if (!this._dataCache) {
  //     await this.fetchData().then(response => response.json()).then((firstLevelData) => {
  //       this._dataCache = firstLevelData;
  //     });
  //   }
  //
  //   childrenIds.forEach((childId: number) => children.set(childId, this._dataCache[childId]));
  //
  //   return children;
  // }
  //
  // private fetchData() {
  //   return fetch(this._url);
  // }
}
