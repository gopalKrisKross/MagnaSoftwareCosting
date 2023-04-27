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

  listName = '';
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
  flagdetails: any = {
    userList: 'User List',
    departmentList: 'Department List',
    softwareLicencesList: 'Software Licences List',
    shiftList: 'Shift List',
    projectList: 'Project List',
  };
  get title() {
    return this.flagdetails[this.listName];
  }
  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
    this.route.params.subscribe((params) => {
      this.listName = params['listName'];
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
      let config: any = { data: this.listName };
      this.dialogService.open(CreateMasterFormComponent, {
        closeOnBackdropClick,
        context: config,
      });
    } catch (error) {}
  }
}
