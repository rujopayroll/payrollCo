import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeContractService, EmployeeService, IdentificationTypeService, GenderService, CountryService, 
         StateService, CityService, EmployeeJobService, EmployeeWorkingService, EmployeeTypeService, WorkingHourService,
         ContractRegimeService, WorkPlaceRisksService, CostCenterService, EmployeePaymentService, 
         EmployeeSocialSecurityService, SocialSecurityEntityService, ContributorTypeService, ContributorSubTypeService,
         EmployeeRecurrentPaymentService, ContractTypeService, EmployeeSalaryService, SalaryTypeService, EmployeeNewService }    from './employeeService.index';
import { SubirArchivoService } from './employeeService.index';






@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    EmployeeService,
    SubirArchivoService,
    EmployeeContractService,
    EmployeeJobService,
    EmployeeWorkingService,
    EmployeePaymentService,
    EmployeeSocialSecurityService,
    EmployeeRecurrentPaymentService,
    ContractTypeService,
    EmployeeSalaryService,
    SalaryTypeService,
    SocialSecurityEntityService,
    IdentificationTypeService,
    EmployeeTypeService,
    WorkingHourService,
    WorkPlaceRisksService,
    ContractRegimeService,
    ContributorTypeService,
    ContributorSubTypeService,
    CostCenterService,
    GenderService,
    CountryService,
    StateService,
    CityService,
    EmployeeNewService
  ],
  declarations: [],
 
})
export class EmployeeserviceModule { }