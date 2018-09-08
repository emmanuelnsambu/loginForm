import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticateService } from './_services/authenticate.service';
import { UserService } from './_services/user.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpintercepterService} from './_helpers/httpintercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    AuthenticateService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpintercepterService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
