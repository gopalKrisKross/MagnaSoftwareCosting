import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit {
  softwareList: any;
  summaryForm: FormGroup;
  summaryData: any;
  shiftDepartmentData: any;

  currentId: number | any;
  currentYear: number | any;
  currentSoftware: any;
  estimationData: any;
  modalTitle: string = '';
  excessData: any;
  excessShiftData: any;
  excessShiftIdData: any;
  excessAUData: any;
  get yearList() {
    return this.pubsub.yearList;
  }
  headerList: any = [
    'Shift',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(
    private pubsub: PubsubService,
    private comService: CommonService,

    private fb: FormBuilder
  ) {
    this.summaryForm = <FormGroup>this.createForm();
  }

  ngOnInit(): void {
    this.getDefaultDataList();
    this.setSubscription();
  }
  getDepartmentName(list: any) {
    return list[0].departmentName;
  }
  calculatShiftTotal(key: string, value: any): number | any {
    try {
      // console.log(value);
      let count = 0;
      value.forEach((element: any) => {
        // console.log(element[key], key, element['shiftName']);
        count += Number(element[key]);
      });

      return count;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for get DD values
   */
  getDefaultDataList() {
    try {
      let param = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
      };
      this.comService.getEstimationData(param).subscribe((res: any) => {
        this.softwareList = res.Table1;
      });
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used  creating a form
   */
  createForm(): FormGroup<any> | any {
    try {
      let formGroup: FormGroup;
      formGroup = this.fb.group({
        software: ['0', Validators.required],

        year: ['0', Validators.required],
      });
      return formGroup;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is use for adding subscription
   */
  subscriptions = new Subscription();
  setSubscription() {
    this.subscriptions.add(
      combineLatest([
        this.summaryForm.get('software')?.valueChanges,
        this.summaryForm.get('year')?.valueChanges,
      ]).subscribe(([software, year]: any) => {
        if (software > 0 && year > 0) {
          this.getSummaryReport();
          this.getAllListData();
        }
      })
    );
  }
  /**
   * @author Sandesh
   * @description this function is used  get summary report
   */
  getSummaryReport() {
    try {
      let value = this.summaryForm.getRawValue();

      let param = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.password,
        userId: Global.LOGGED_IN_USER.userId,
        licenceId: value.software,
        year: value.year,
      };
      this.comService.getSummaryList(param).subscribe((res: any) => {
        if (res) {
          this.summaryData = res.Table;
        }
      });
    } catch (error) {}
  }
  getColor(key: string, a: any, b: any, c: number) {
    let A = this.calculatShiftTotal(key, a);
    let B = this.calculatShiftTotal(key, b);

    return c - A - B >= 0 ? true : false;
  }
  /**
   * @author Sandesh
   * @description this function is used for getting estimation list
   */
  getData(id: number, year: number, department: string) {
    try {
      this.modalTitle = department;
      let values = this.summaryForm.getRawValue();
      if (
        id != this.currentId ||
        year != this.currentYear ||
        this.currentSoftware != values.software
      ) {
        this.currentId = id;
        this.currentYear = year;
        this.currentSoftware = values.software;

        if (this.summaryForm.valid) {
          let params = {
            dbName: Global.LOGGED_IN_USER.dbName,
            dbPassword: Global.LOGGED_IN_USER.dbPassword,
            userId: Global.LOGGED_IN_USER.userId,
            departmentId: id,
            licenceId: values.software,
            year: values.year,
          };
          this.comService.getEstimationListData(params).subscribe(
            (res: any) => {
              if (res) {
                this.shiftDepartmentData = this.filterData(
                  id,
                  res.Table,
                  'shiftName'
                );
                this.estimationData = this.filterData(
                  -1,
                  res.Table,
                  'projectName'
                );
              }
            },
            (err: Error) => {
              console.error(err);
            }
          );
        }
      }
    } catch (error) {}
  }

  getValues(value: any) {
    return value;
  }
  /**
   * @author Sandesh
   * @description this function is used for getting   group by data
   */
  filterData(id: number, list: any, type: string) {
    try {
      return list.reduce((previous: any, current: any) => {
        if (id == current['departmentId']) {
          if (!previous[current[type]]) {
            previous[current[type]] = [current];
          } else {
            previous[current[type]].push(current);
          }
          return previous;
        } else {
          if (!previous[current[type]]) {
            previous[current[type]] = [current];
          } else {
            previous[current[type]].push(current);
          }
          return previous;
        }
      }, {});
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for getting  all data for excess shortfall
   */
  getAllListData() {
    try {
      let values = this.summaryForm.getRawValue();
      let params = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
        departmentId: 0,
        licenceId: values.software,
        year: values.year,
      };
      this.comService.getEstimationListData(params).subscribe(
        (res: any) => {
          this.excessShiftData = this.filterData(-1, res.Table, 'shiftName');
          this.excessShiftIdData = this.filterData(-1, res.Table, 'shiftId');

          this.excessData = res.Table;
          this.excessAUData = res.Table1;
        },
        (err: Error) => {
          console.error(err);
        }
      );
    } catch (error) {}
  }
}
