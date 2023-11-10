import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CommonService } from 'src/app/services/common/common.service';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
import { CreateMasterFormComponent } from 'src/app/shared/create-master-form/create-master-form.component';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  // regex: RegExp = /[A-Z]/g;
  textSearch:any
  pageType: string = '';
  // titleName = '';

  flagdetails: any = {
    User: 'User List',
    Department: 'Department List',
    SoftwareLicence: 'Software Licences List',
    Shift: 'Shift List',
    Project: 'Project List',
    reportList: 'Report List',
  };
  masterList: any;
  get title() {
    return this.flagdetails[this.pageType];
  }
  get userList() {
    return ['user'].includes(this.pageType.toLowerCase());
  }
  get shiftList() {
    return ['shift'].includes(this.pageType.toLowerCase());
  }
  get projectList() {
    return ['project'].includes(this.pageType.toLowerCase());
  }
  p: number = 1;
  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private commonService: CommonService,
    private pubsub: PubsubService
  ) {
    this.route.params.subscribe((params) => {
      this.pageType = params['pageType'];
      this.getMasterList(this.pageType);
    });

    // this.titleName = this.listName;
    // console.log(this.titleName.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"));
  }

  ngOnInit(): void {
    this.pubsub.reloadURL$.subscribe((res: any) => {
      if (res) {
        this.getMasterList(res);
      }
    });
  }
  /**
   * @author Sandesh
   * @description this function is used for open master form
   */
  openModal(closeOnBackdropClick: boolean, action: string, list: object) {
    try {
      let config: any = {
        data: this.pageType,
        action: action,
        list: list,
        flag: this.pageType,
      };
      this.dialogService.open(CreateMasterFormComponent, {
        closeOnBackdropClick,
        context: config,
      });
    } catch (error) {}
  }
  getMasterList(entity: string) {
    try {
      let params = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.password,
        userId: Global.LOGGED_IN_USER.userId,
        entityName: entity,
        flage: 'List',
        entityId: '',
      };
      this.commonService.masterList(params).subscribe(
        (res: any) => {
          if (res) {
            this.masterList = res.Table;
          }
        },
        (err: Error) => {
          console.error(err);
        }
      );
    } catch (error) {}
  }
}
