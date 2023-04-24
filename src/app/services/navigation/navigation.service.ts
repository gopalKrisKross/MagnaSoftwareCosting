import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  shouldNotReplaceUrl(iUrl: any, iCallBack: any) {
    this.router.navigateByUrl(iUrl).then(
      (success) => {
        if (iCallBack && typeof iCallBack == 'function')
          iCallBack({ status: true, result: success });
      },
      (error) => {
        console.error(error);
        if (iCallBack && typeof iCallBack == 'function')
          iCallBack({ status: false, result: error });
      }
    );
  }

  /**
   * @author Sandesh
   * @description this function is used going to page
   * @param iUrl
   */
  gotoPage(iUrl: string, config: any, iCallBack?: any) {
    try {
      this.shouldNotReplaceUrl(iUrl, iCallBack);
    } catch (error) {
      console.log(error);
    }
  }
}
