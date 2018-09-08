import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticateService {
  private url;
  constructor(private http: HttpClient) {
    this.url = 'https://api.amalyze.com/0.1.15/system.user.login';
  }

  login(captcha: string, username: string, password: string) {
    return this.http.post(this.url,
      { captcha: captcha, username: username, password_md5: password},
      {observe: 'response'})
      .pipe(map(user => {
        return user;
      }));
  }
}
