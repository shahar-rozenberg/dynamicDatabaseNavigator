import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigatorLevel} from '../models/navigator-level';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'assets/data.json';
  private readonly _firstLevelIndexes: number[] = [1, 2, 3];

  constructor(private httpClient: HttpClient) {
  }

  public getFirstLevelItems() {
    return new Promise((resolve) => {
      const firstItems: Map<number, NavigatorLevel> = new Map();
      return this.fetchData().subscribe((data: Map<number, NavigatorLevel>) => {
        this._firstLevelIndexes.forEach((index: number) => firstItems.set(index, data[index]));
        resolve(firstItems);
      });
    });
  }

  public getRowChildren(childrenIds: number[]) {
    return new Promise((resolve) => {
      const children: Map<number, NavigatorLevel> = new Map();
      return this.fetchData().subscribe((data: Map<number, NavigatorLevel>) => {
        childrenIds.forEach((childId: number) => children.set(childId, data[childId]));
        resolve(children);
      });
    });
  }

  private fetchData() {
      return this.httpClient.get(this.url);
  }

  public getIconSrcByType(type: string): string {
    return environment.TYPE_TO_SRC_MAP[type];
  }
}
