import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private url;
  constructor(private http: HttpClient) {
    this.url = 'https://api.amalyze.com/0.1.15/system.user.status';
  }

  userData() {
   return this.http.get(this.url)
     .subscribe(
        data => {
          localStorage.setItem('userData', JSON.stringify(data));
        }
      );
  }
}
