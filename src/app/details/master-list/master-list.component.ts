import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {
  // regex: RegExp = /[A-Z]/g;

  listName = '';
  // titleName = '';
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.listName = params['listName']
    })
    // this.titleName = this.listName;
    // console.log(this.titleName.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"));
  }

  ngOnInit(): void {
    
    console.warn(this.route.snapshot.paramMap.get('listName'))
  }
  
  masterListHeading: any = ['ID', 'Name', 'License Server ID', 'Login ID', 'Password', 'Department ID', 'License Server Dept ID', 'Status', 'Added By', 'Added Date', 'Updated By', 'Updated Date']
  
  info = [{
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
    updateDate: '25/01/22'
  },{
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
    updateDate: '25/01/22'
  },{
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
    updateDate: '25/01/22'
  },{
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
    updateDate: '25/01/22'
  },]


 
}
