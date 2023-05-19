import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  reportListData: any;
  reportForm: FormGroup;
  pageType: string = '';
  softwareList: any;
  totalCalculateData: any;
  get monthList() {
    return this.pubsub.monthList;
  }
  get yearList() {
    return this.pubsub.yearList;
  }
  constructor(
    private route: ActivatedRoute,
    private comService: CommonService,
    private pubsub: PubsubService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.pageType = params['pageType'];
    });
    this.reportForm = <FormGroup>this.createReportForm();
  }

  ngOnInit(): void {
    this.getDefaultDataList();
  }
  createReportForm(): FormGroup<any> | any {
    try {
      let formGroup: FormGroup;
      formGroup = this.fb.group({
        software: ['0'],
        month: ['0'],
        year: ['0'],
      });
      return formGroup;
    } catch (error) {}
  }
  getReportList() {
    try {
      let value = this.reportForm.getRawValue();
      let param = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
        licenceId: value.software,
        month: value.month,
        year: value.year,
      };
      this.comService.getReportList(param).subscribe((res: any) => {
        console.log(res);
        this.reportListData = res.Table;
        this.totalCalculateData = res.Table1[0];
      });
    } catch (error) {}
  }
  getDefaultDataList() {
    try {
      let param = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
      };
      this.comService.getEstimationData(param).subscribe((res: any) => {
        console.log(res);
        this.softwareList = res.Table1;
      });
    } catch (error) {}
  }
  getTotal(list: any, type: string): any {
    try {
      if (list) {
        let count = 0;
        list.forEach((element: any) => (count += Number(element[type])));
        return count.toFixed(2);
      }
    } catch (error) {}
  }
}
