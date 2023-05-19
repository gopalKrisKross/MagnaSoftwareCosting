import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Global } from 'src/app/shared/global';
import {
  IDeptActualUsageParam,
  IActualUsageListing,
  IEstimation,
  IEstimationListParam,
  IEstimationSaveParam,
  IMasterList,
  IMasterListAddEdit,
  IreportListParam,
} from 'src/app/shared/model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  handleError(error: any): any {
    try {
      return new Error(
        'We are facing some issue while saving/getting data. Please try after sometime.'
      );
    } catch (error) {
      console.error(error);
    }
  }

  constructor(private http: HttpClient) {}
  /**
   * @author Sandesh
   * @description this function is used for  getting master List
   */
  masterList(param: IMasterList): Observable<IMasterList> | any {
    try {
      //http://192.168.1.136:90/api/listing/commonListing
      return this.http
        .post(Global.MAGNA_API + '/listing/commonListing', param, {
          headers: this.getHeaders(),
        })
        .pipe(
          switchMap((t: any) => of(JSON.parse(t))),
          catchError(this.handleError)
        );
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * @author Sandesh
   * @description this function is used for  getting master List
   */
  masterListAddEdit(
    param: IMasterListAddEdit
  ): Observable<IMasterListAddEdit> | any {
    try {
      //http://192.168.1.136:90/api/addEdit/commonAddEdit
      return this.http
        .post(Global.MAGNA_API + '/addEdit/commonAddEdit', param, {
          headers: this.getHeaders(),
        })
        .pipe(
          switchMap((t: any) => of(JSON.parse(t))),
          catchError(this.handleError)
        );
    } catch (error) {
      console.error(error);
    }
  }
  getEstimationData(param: IEstimation): Observable<IEstimation> | any {
    try {
      //http://192.168.1.136:90/api/listing/commonDefaultListing
      return this.http
        .post(Global.MAGNA_API + '/listing/commonDefaultListing', param, {
          headers: this.getHeaders(),
        })
        .pipe(
          switchMap((t: any) => of(JSON.parse(t))),
          catchError(this.handleError)
        );
    } catch (error) {
      console.error(error);
    }
  }
  getEstimationListData(
    param: IEstimationListParam
  ): Observable<IEstimationListParam> | any {
    try {
      //http://192.168.1.136:90/api/listing//estimationListing
      return this.http
        .post(Global.MAGNA_API + '/listing//estimationListing', param, {
          headers: this.getHeaders(),
        })
        .pipe(
          switchMap((t: any) => of(JSON.parse(t))),
          catchError(this.handleError)
        );
    } catch (error) {
      console.error(error);
    }
  }
  saveEstimationData(
    param: IEstimationSaveParam
  ): Observable<IEstimationSaveParam> | any {
    try {
      //http://192.168.1.136:90/api/listing//estimationAddEdit
      return this.http
        .post(Global.MAGNA_API + '/addEdit/estimationAddEdit', param, {
          headers: this.getHeaders(),
        })
        .pipe(
          switchMap((t: any) => of(JSON.parse(t))),
          catchError(this.handleError)
        );
    } catch (error) {
      console.error(error);
    }
  }

  getActualUsageListing(
    param: IActualUsageListing
  ): Observable<IActualUsageListing> | any {
    //   http://192.168.1.136:90/api/listing/actualUsageListing
    return this.http
      .post(Global.MAGNA_API + '/listing/actualUsageListing', param, {
        headers: this.getHeaders(),
      })
      .pipe(
        switchMap((t: any) => of(JSON.parse(t))),
        catchError(this.handleError)
      );
  }
  //   http://192.168.1.136:90/api/addEdit/actualUsageAddEdit

  saveEditDeptActualUsage(
    param: IDeptActualUsageParam
  ): Observable<IDeptActualUsageParam> | any {
    return this.http
      .post(Global.MAGNA_API + '/addEdit/actualUsageAddEdit', param, {
        headers: this.getHeaders(),
      })
      .pipe(
        switchMap((t: any) => of(JSON.parse(t))),
        catchError(this.handleError)
      );
  }
  saveEditDepartment(param: any): Observable<any> | any {
    // http://localhost:4950/api/addEdit/UseByDepartmentAddEdit
    return this.http
      .post(Global.MAGNA_API + '/addEdit/UseByDepartmentAddEdit', param, {
        headers: this.getHeaders(),
      })
      .pipe(
        switchMap((t: any) => of(JSON.parse(t))),
        catchError(this.handleError)
      );
  }
  getReportList(param: IreportListParam): Observable<IreportListParam> | any {
    //http://localhost:4950/api/listing/actualUsageReports

    return this.http
      .post(Global.MAGNA_API + '/listing/actualUsageReports', param, {
        headers: this.getHeaders(),
      })
      .pipe(
        switchMap((t: any) => of(JSON.parse(t))),
        catchError(this.handleError)
      );
  }
}
