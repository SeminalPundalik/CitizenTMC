import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './GlobalComponent/login/login.component';
import { PageloadingComponent } from './pageloading/pageloading.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nConfigService, HttpLoaderFactory } from './i18n-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './GlobalComponent/header/header.component';
import { RegisterpageComponent } from './GlobalComponent/registerpage/registerpage.component';
import { CaptchaComponent } from './GlobalComponent/captcha/captcha.component';
import { DashboardComponent } from './GlobalComponent/dashboard/dashboard.component';
import { ProfileComponent } from './Securedcomponents/profile/profile.component';
import { TaxDetailsComponent } from './Securedcomponents/tax-details/tax-details.component';
import { OnlineapplicationsComponent } from './Securedcomponents/onlineapplications/onlineapplications.component';
import { SearchDetailsComponent } from './Securedcomponents/search-details/search-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageloadingComponent,
    HeaderComponent,
    RegisterpageComponent,
    CaptchaComponent,
    DashboardComponent,
    ProfileComponent,
    TaxDetailsComponent,
    OnlineapplicationsComponent,
    SearchDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private i18nService: I18nConfigService) {
    this.i18nService.init();
    this.i18nService.loadTranslations().then(() => {
      // Do something when translations are loaded if needed
    });
  }
 }