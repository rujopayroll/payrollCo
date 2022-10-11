import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { NewEmployeeModule } from '../employees/pages/new/new.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './pages/employee/employee.component';
import { InfoEmployeeComponent } from './components/infoEmployee/infoEmployee.component';
import { WorkingEmployeeComponent } from './components/workingEmployee/workingEmployee.component';
import { JobEmployeeComponent } from './components/jobEmployee/jobEmployee.component';
import { PaymentEmployeeComponent } from './components/paymentEmployee/paymentEmployee.component';
import { SocialSecurityEmployeeComponent } from './components/socialSecurityEmployee/socialSecurityEmployee.component';
import { EmployeeCardListComponent } from './components/employee-card-list/employee-card-list.component';
import { RecurrentPaymentEmployeeComponent } from './components/recurrentPaymentEmployee/recurrentPaymentEmployee.component';
import { ContractEmployeeComponent } from './components/contractEmployee/contractEmployee.component';
import { SalaryEmployeeComponent } from './components/salaryEmployee/salaryEmployee.component';
import { NewComponent } from './pages/new/new.component';
import { PersonalComponent } from './pages/new/personal/personal.component';

@NgModule({
  declarations: [
   ListComponent,
   //PersonalComponent,
   EmployeeComponent,
   EmployeeCardListComponent,
   InfoEmployeeComponent,
   WorkingEmployeeComponent,
   JobEmployeeComponent,
   PaymentEmployeeComponent,
   SocialSecurityEmployeeComponent,
   RecurrentPaymentEmployeeComponent,
   ContractEmployeeComponent,
   SalaryEmployeeComponent,
   
  
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NewEmployeeModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    Ng2PageScrollModule
    
  ]
})
export class EmployeesModule { }
