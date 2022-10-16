import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CompanyServiceModule } from './companies/services/companyservice.module';
import { EmployeeserviceModule } from './employees/services/employeeService.module';
import { PayrollModule } from './payroll/payroll.module';


import localeES from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
//import { Ng2PageScrollModule } from 'ng2-page-scroll';
//import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core'
import { ModalUploadComponent } from './companies/components/modal-upload/modal-upload.component';
import { PrimeNGModule } from './prime-ng/prime-ng.module';



registerLocaleData(localeES, 'es');








@NgModule({
  declarations: [
 AppComponent,
 ModalUploadComponent,

    
  ],
  imports: [
    BrowserModule,
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
   
   
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
