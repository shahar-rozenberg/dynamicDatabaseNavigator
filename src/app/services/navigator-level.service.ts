import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigatorLevelService {

  constructor() { }

  public getIconSrcByType(type: string): string {
    return environment.TYPE_TO_SRC_MAP[type];
  }
}
