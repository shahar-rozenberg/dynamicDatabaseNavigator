import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigatorLevel} from '../models/navigator-level';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url: string = 'assets/data.json';
  private _dataCache;
  private readonly FIRST_LEVEL_INDEXES: number[] = [1, 2, 3];

  constructor(private httpClient: HttpClient) {
  }

  public async getTreeItemsByIds(itemsIds: number[] = this.FIRST_LEVEL_INDEXES) {
    const selectedItems: Map<number, NavigatorLevel> = new Map();
    if (!this._dataCache) {
      this._dataCache = await this.fetchData().toPromise();
    }
    itemsIds.forEach((itemId: number) => selectedItems.set(itemId, this._dataCache[itemId]));
    return selectedItems;
  }

  private fetchData() {
    return this.httpClient.get(this._url);
  }
}
