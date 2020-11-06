import {Component, Input, OnInit} from '@angular/core';
import {NavigatorLevel} from '../models/navigator-level';
import {ApiService} from '../services/api.service';
import {PermissionsService} from '../services/permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ui-tree-item',
  templateUrl: './ui-tree-item.component.html',
  styleUrls: ['./ui-tree-item.component.less']
})
export class UiTreeItemComponent implements OnInit {
  @Input() itemId: number;
  @Input() item: NavigatorLevel;
  private _treeItems: Map<number, NavigatorLevel> = new Map();
  private _isExpand: boolean = false;

  constructor(private _apiService: ApiService, private permissionsService: PermissionsService) {
  }

  get treeItems(): Map<number, NavigatorLevel> {
    return this._treeItems;
  }

  set treeItems(value: Map<number, NavigatorLevel>) {
    this._treeItems = value;
  }

  get isExpand(): boolean {
    return this._isExpand;
  }

  set isExpand(value: boolean) {
    this._isExpand = value;
  }

  ngOnInit() {
  }

  public openRow(): void {
    if (!this._isExpand) {
      if (this.permissionsService.isUserAuthorized(this.itemId)) {
        this._isExpand = true;
        this._apiService.getRowChildren(this.item.children).then((children: Map<number, NavigatorLevel>) => {
          this._treeItems = children;
        });
      } else {
        this.openForbiddenPopup();
      }
    } else {
      this.isExpand = false;
    }
  }

  public getIconSrc(): string {
    return this._apiService.getIconSrcByType(this.item.type);
  }

  private openForbiddenPopup(): void {
    Swal.fire({
      title: 'FORBIDDEN',
      text: 'You do not have permission for this item',
      icon: 'error',
    });
  }
}
