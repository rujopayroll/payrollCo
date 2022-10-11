import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService, PeriodService, GetEmployeeService, AbsenteeService, DiagnosisService } from '../services/payrollService.index';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    PeriodService,
    PayrollService,
    GetEmployeeService,
    AbsenteeService,
    DiagnosisService

  ],
  declarations: [],
 
})
export class PayrollserviceModule { }