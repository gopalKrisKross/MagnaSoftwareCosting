import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MasterForm } from '../action';

@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss'],
})
export class CreateMasterFormComponent implements OnInit {
  masterFormDetails: any = new MasterForm();
  masterForm: FormGroup;
  constructor(private dialogRef: NbDialogRef<any>, private fb: FormBuilder) {
    this.masterForm = <FormGroup>this.getMasterForm(this.masterFormDetails);
  }

  ngOnInit(): void {
    console.log('dialogRef', this.dialogRef.componentRef.instance.data);
  }
  /**
   * @author SSW
   * @description this function is used for getting action form
   * @param iObj
   */
  getMasterForm(iObj?: MasterForm): FormGroup {
    let formGroup: FormGroup;
    if (iObj && Object.keys(iObj).length > 0) {
      formGroup = <FormGroup>this.fb.group({
        id: [iObj.id, [Validators.required]],
        name: [iObj.name],
        licenceServerID: [iObj.licenceServerID],
        loginID: [iObj.loginID],
        password: [iObj.password],
        departmentID: [iObj.departmentID],
        licenceServerDeptID: [iObj.licenceServerDeptID],
        status: [iObj.status],
        addedby: [iObj.addedby],
        addedDate: [iObj.addedDate],
        updatedby: [iObj.updatedby],
        updateDate: [iObj.updateDate],
      });
    } else {
      formGroup = <FormGroup>this.fb.group({
        id: ['', [Validators.required]],
        name: [''],
        licenceServerID: [''],
        loginID: [''],
        password: [''],
        departmentID: [''],
        licenceServerDeptID: [''],
        status: [''],
        addedby: [''],
        addedDate: [''],
        updatedby: [''],
        updateDate: [''],
      });
    }
    return formGroup;
  }
  /**
   * @author Sandesh
   * @description this function is used for  close modal
   */
  close(type: boolean) {
    try {
      this.dialogRef.close();
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for Save Form
   */
  saveDetails() {
    try {
      this.getParams()
        .then((param) => {
          console.log(param);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for set params
   *
   */
  getParams(): Promise<MasterForm> {
    let params: MasterForm;
    return new Promise((resolve, reject) => {
      let values = this.masterForm.getRawValue();

      resolve(values);
    });
  }
}
