import {Component, Input} from '@angular/core';
import {NavigatorLevel} from '../models/navigator-level';
import {ApiService} from '../services/api.service';
import {PermissionsService} from '../services/permissions.service';
import Swal from 'sweetalert2';
import {NavigatorLevelService} from '../services/navigator-level.service';

@Component({
  selector: 'app-ui-tree-item',
  templateUrl: './ui-tree-item.component.html',
  styleUrls: ['./ui-tree-item.component.less']
})
export class UiTreeItemComponent {
  @Input() itemId: number;
  @Input() item: NavigatorLevel;
  private _nextLevelItems: Map<number, NavigatorLevel> = new Map();
  private _isExpand: boolean = false;

  constructor(private _apiService: ApiService, private permissionsService: PermissionsService,
              private _navigatorLevelService: NavigatorLevelService) {
  }

  get nextLevelItems(): Map<number, NavigatorLevel> {
    return this._nextLevelItems;
  }

  set nextLevelItems(value: Map<number, NavigatorLevel>) {
    this._nextLevelItems = value;
  }

  get isExpand(): boolean {
    return this._isExpand;
  }

  set isExpand(value: boolean) {
    this._isExpand = value;
  }

  public itemClicked(): void {
    if (!this._isExpand) {
      this.openRow();
    } else {
      this._isExpand = false;
    }
  }

  private openRow(): void {
    if (this.permissionsService.isUserAuthorized(this.itemId)) {
      this._isExpand = true;
      if (!this._nextLevelItems.size) {
        this.selectNextLevel();
      }
    } else {
      this.openForbiddenPopup();
    }
  }


  private selectNextLevel(): void {
    this._apiService.getRowChildren(this.item.children).then((children: Map<number, NavigatorLevel>) => {
      this._nextLevelItems = children;
    });
  }

  public getIconSrc(): string {
    return this._navigatorLevelService.getIconSrcByType(this.item.type);
  }

  private openForbiddenPopup(): void {
    Swal.fire({
      title: 'FORBIDDEN',
      text: 'You do not have permission for this item',
      icon: 'error',
    });
  }
}
