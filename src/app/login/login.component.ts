import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation/navigation.service';
import { LoginService } from '../services/loginservice/login.service';
import { PubsubService } from '../services/pubsub/pubsub.service';
import { ToasterService } from '../services/toaster/toaster.service';

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
  constructor(
    private nav: NavigationService,
    private loginService: LoginService,
    private toast: ToasterService
  ) {
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
        // let param = {
        //   dbName: 'MagnaLicenseUsage',
        //   emailId: 'chavandattatray24@gmail.com',
        //   password: '123456789',
        // };
        let param = {
          //dbName: 'MagnaLicenseUsage',
          emailId: value.EmailId,
          password: value.Password,
        };
        // this.pubsub.showLoader(true);

        this.loginService.login(param).subscribe(
          (res: any) => {
            if (res && res.length > 0) {
              localStorage.setItem(
                'Global.LOGGED_IN_USER',
                JSON.stringify(res[0])
              );

              let leadUrl = 'component/pages';

              this.nav.gotoPage(
                leadUrl,
                { replaceUrl: true },
                (res: any) => {}
              );
            } else {
              this.toast.showError('User-ID / Password Combination Wrong.');
            }
          },
          (err: any) => {}
        );
      }
    } catch (error) {
      // this.pubsub.showLoader(false);
    }
  }
  ngOnInit(): void {}
}
