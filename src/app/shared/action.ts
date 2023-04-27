import { Imaster } from './model';

export class MasterForm implements Imaster {
  id: string | number;
  name: string;
  licenceServerID: string | number;
  loginID: string | number;
  password: string;
  departmentID: string | number;
  licenceServerDeptID: string | number;
  status: any;
  addedby: string;
  addedDate: string;
  updatedby: string;
  updateDate: string;
  constructor(
    id: string | number = '',
    name: string = '',
    licenceServerID: string | number = '',
    loginID: string | number = '',
    password: string = '',
    departmentID: string | number = '',
    licenceServerDeptID: string | number = '',
    status: any = '',
    addedby: string = '',
    addedDate: string = '',
    updatedby: string = '',
    updateDate: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.licenceServerID = licenceServerID;
    this.loginID = loginID;
    this.password = password;
    this.departmentID = departmentID;
    this.licenceServerDeptID = licenceServerDeptID;
    this.status = status;
    this.addedby = addedby;
    this.addedDate = addedDate;
    this.updatedby = updatedby;
    this.updateDate = updateDate;
  }
}
