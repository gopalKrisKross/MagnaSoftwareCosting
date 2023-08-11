import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Global } from 'src/app/shared/global';
import { ILoginDetails } from 'src/app/shared/model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
   * @description this function is used for login user
   */
  login(param: ILoginDetails): Observable<ILoginDetails> | any {
    try {
      return this.http
        .post(Global.MAGNA_API + '/login/userLogin', param, {
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
}
