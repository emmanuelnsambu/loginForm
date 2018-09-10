import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthenticateService } from '../_services/authenticate.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn = false;
  loginFailed = false;
  userData = '';
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticateService: AuthenticateService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // remove the user stored values
    localStorage.setItem('userFalconToken', '');
    localStorage.setItem('userXSRFToken', '');
  }

  get formData() {
    return this.loginForm.controls;
  }

  hashPassword(password: string) {
    const md5 = new Md5();
    return md5.appendStr(password).end();
  }

  submit(captchaResponse: string) {
    if (captchaResponse) {
      this.loginFailed = false;
      this.loggedIn = false;
      this.authenticateService.login (
        captchaResponse,
        this.formData.username.value,
        (this.hashPassword(this.formData.password.value)).toString())
        .subscribe(
          data => {
            if (data.headers) {
              // store user tokens
              localStorage.setItem('userFalconToken', data.headers.get('X-FALCON-TOKEN'));
              localStorage.setItem('userXSRFToken', data.headers.get('X-XSRF-TOKEN'));
            }

            this.userService.userData();
            if (localStorage.getItem('userData')) {
              this.loggedIn = true;
              this.userData = localStorage.getItem('userData');
              grecaptcha.reset();
              this.loginForm.reset();
            }
          },
          message => {
            this.errorMessage = message.error.request.error.message;
            this.loginFailed = true;
            grecaptcha.reset();
            this.loginForm.reset();
          });
    }
  }

}
