export interface EstimationAction {
  department: string;
  software: string;
  toDatePicker: string;
  fromDatePicker: string;
}
export interface Imaster {
  id: number | string;
  name: string;
  licenceServerID: number | string;
  loginID: number | string;
  password: string;
  departmentID: number | string;
  licenceServerDeptID: number | string;
  status: any;
  addedby: string;
  addedDate: string;
  updatedby: string;
  updateDate: string;
}
