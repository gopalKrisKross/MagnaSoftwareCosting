import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CreateMasterFormComponent } from 'src/app/shared/create-master-form/create-master-form.component';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  // regex: RegExp = /[A-Z]/g;

  pageType: string = '';
  // titleName = '';
  masterListHeading: any = {
    id: 'ID',
    name: 'Name',
    lSId: 'License Server ID',
    loginId: 'Login ID',
    password: 'Password',
    deptId: 'Department ID',
    lSDId: 'License Server Dept ID',
    status: 'Status',
    addBy: 'Added By',
    addDate: 'Added Date',
    updateBy: 'Updated By',
    updateDate: 'Updated Date',
  };

  info = [
    {
      id: '12',
      name: 'sample',
      lSId: 'adf',
      loginId: 'adf',
      password: 'asdfafd',
      deptId: 'adfadfas',
      lSDId: 'adfsad',
      status: 'closed',
      addBy: 'adfaf',
      addDate: '12/2/22',
      updateBy: 'adfsaf',
      updateDate: '25/01/22',
    },
    {
      id: '12',
      name: 'sample',
      lSId: 'adf',
      loginId: 'adf',
      password: 'asdfafd',
      deptId: 'adfadfas',
      lSDId: 'adfsad',
      status: 'closed',
      addBy: 'adfaf',
      addDate: '12/2/22',
      updateBy: 'adfsaf',
      updateDate: '25/01/22',
    },
    {
      id: '12',
      name: 'sample',
      lSId: 'adf',
      loginId: 'adf',
      password: 'asdfafd',
      deptId: 'adfadfas',
      lSDId: 'adfsad',
      status: 'closed',
      addBy: 'adfaf',
      addDate: '12/2/22',
      updateBy: 'adfsaf',
      updateDate: '25/01/22',
    },
    {
      id: '12',
      name: 'sample',
      lSId: 'adf',
      loginId: 'adf',
      password: 'asdfafd',
      deptId: 'adfadfas',
      lSDId: 'adfsad',
      status: 'closed',
      addBy: 'adfaf',
      addDate: '12/2/22',
      updateBy: 'adfsaf',
      updateDate: '25/01/22',
    },
  ];
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
    userList: 'User List',
    departmentList: 'Department List',
    softwareLicencesList: 'Software Licences List',
    shiftList: 'Shift List',
    projectList: 'Project List',
    reportList: 'Report List',
  };
  get title() {
    return this.flagdetails[this.pageType];
  }
  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
    this.route.params.subscribe((params) => {
      this.pageType = params['listName'];
    });

    // this.titleName = this.listName;
    // console.log(this.titleName.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"));
  }

  ngOnInit(): void {
    console.warn(this.route.snapshot.paramMap.get('listName'));
  }
  /**
   * @author Sandesh
   * @description this function is used for open master form
   */
  openModal(closeOnBackdropClick: boolean) {
    try {
      let config: any = { data: this.pageType };
      this.dialogService.open(CreateMasterFormComponent, {
        closeOnBackdropClick,
        context: config,
      });
    } catch (error) {}
  }
}
