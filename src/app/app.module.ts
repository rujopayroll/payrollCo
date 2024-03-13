import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { EmployeeserviceModule } from './employees/services/employeeService.module';
import { PayrollModule } from './payroll/payroll.module';


import localeES from '@angular/common/locales/en';
import { registerLocaleData, CommonModule, } from '@angular/common';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
//import { Ng2PageScrollModule } from 'ng2-page-scroll';
//import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core'
import { ModalUploadComponent } from './companies/components/modal-upload/modal-upload.component';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { CompanyServiceModule } from './companies/services/companyService.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



registerLocaleData(localeES, 'es');








@NgModule({
  declarations: [
 AppComponent,
 ModalUploadComponent,
 

    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CompanyServiceModule,
    EmployeeserviceModule,
    PayrollModule,
    DashboardRoutingModule,
   //Ng2PageScrollModule,
   //NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FormsModule,
   ReactiveFormsModule,
   PrimeNGModule,
   ServiceWorkerModule.register('ngsw-worker.js', {
     enabled: environment.production,
     // Register the ServiceWorker as soon as the application is stable
     // or after 30 seconds (whichever comes first).
     registrationStrategy: 'registerWhenStable:30000'
   }),
   
   
   
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
