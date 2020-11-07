import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() {
  }

  public isUserAuthorized(itemId: number) {
    const randomBoolean: boolean = Math.random() * itemId >= 0.8;
    return randomBoolean;
  }
}
