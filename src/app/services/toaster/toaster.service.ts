import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

 
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastrService: ToastrService) { }
  public showSuccess(msg:string): void {
    this.toastrService.success('',msg);
  }

  public showInfo(msg:string): void {
    this.toastrService.info('',msg);
  }

  public showWarning(msg:string): void {
    this.toastrService.warning('',msg);
  }

  public showError(msg:string): void {
     
    this.toastrService.error('',msg);
  }
}
