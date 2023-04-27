import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // image: string = 'assets/login/login.png';
  loginForm: FormGroup;
  image: string = 'assets/login/draw2.webp';
  get f() {
    return this.loginForm.controls;
  }
  constructor(private fb: FormBuilder, private nav: NavigationService) {
    this.loginForm = this.createLoginForm();
  }
  createLoginForm(iObj?: any): any {
    try {
      return new FormGroup({
        EmailId: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
      });
    } catch (error) {
      console.error(error);
    }
  }
  login() {
    try {
      if (this.loginForm.valid) {
        let value = this.loginForm.getRawValue();
        let leadUrl = 'component/details/create';

        this.nav.gotoPage(leadUrl, { replaceUrl: true }, (res: any) => {
          console.log(res);
        });
      }
    } catch (error) {}
  }
  ngOnInit(): void {}
}
