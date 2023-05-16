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

  pageType: string = '';
  // titleName = '';

  reportListData = [
    {
      id: '1',
      department: 'EB',
      actualUsageIt: '1.31',
      costActualUsage: '1,127.07 ',
      latestProjection: '4.00',
      expressProjection: '  2.69 ',
      sharingUnutilisedLicense: '9%',
      unutilisedLicenses: '  1.63 ',
      costUnutilisedLicenses: '  1,410.33 ',
      totalCost: '  2,537.40 ',
    },
    {
      id: '2',
      department: 'EC',
      actualUsageIt: '  8.41 ',
      costActualUsage: '  7,258.96  ',
      latestProjection: '  13.00 ',
      expressProjection: '  4.59 ',
      sharingUnutilisedLicense: '15%',
      unutilisedLicenses: '  2.78 ',
      costUnutilisedLicenses: '  2,401.69   ',
      totalCost: '   9,660.65  ',
    },
    {
      id: '3',
      department: 'EE',
      actualUsageIt: '0.29',
      costActualUsage: '  252.17 ',
      latestProjection: '2.00',
      expressProjection: '1.71',
      sharingUnutilisedLicense: '6%',
      unutilisedLicenses: '  1.04 ',
      costUnutilisedLicenses: '  894.09  ',
      totalCost: '  1,146.26 ',
    },
    {
      id: '4',
      department: 'EI',
      actualUsageIt: '  58.43 ',
      costActualUsage: '  50,420.37 ',
      latestProjection: '  79.00 ',
      expressProjection: '   20.57   ',
      sharingUnutilisedLicense: '67%',
      unutilisedLicenses: '  12.48  ',
      costUnutilisedLicenses: '  10,767.35 ',
      totalCost: '  61,187.72 ',
    },
    {
      id: '5',
      department: 'EV& ES',
      actualUsageIt: '1.04',
      costActualUsage: '894.73',
      latestProjection: '2.00',
      expressProjection: '0.96',
      sharingUnutilisedLicense: '3%',
      unutilisedLicenses: '0.58',
      costUnutilisedLicenses: '504.21',
      totalCost: '1,398.94',
    },
  ];
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
      console.log(Global.LOGGED_IN_USER);
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
          console.log(res);
          if (res) {
            this.masterList = res.Table;
            console.log(this.masterList);
          }
        },
        (err: Error) => {
          console.error(err);
        }
      );
    } catch (error) {}
  }
}
