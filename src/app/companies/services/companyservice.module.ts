import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CostCenter } from '../models/costCenter.model';
import { CompanyService,  ConceptService, ProductService, CountryService, StateService, CityService,
         SocialSecurityEntityService, PaymentFrequencyService, CompanyPaymentService, PaymentMethodService, BankService,
         AccounttypeService, CostCenterService, SpendingAccountService, AreaService, SubsidiaryService,
         PositionService, IdentificationTypeService, CompanyPayrollService, AssistancetypeService  } from './companyService.index';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    CompanyService,
    ConceptService,
    CountryService,
    StateService,
    CityService,
    SocialSecurityEntityService,
    PaymentFrequencyService,
    CompanyPaymentService,
    CompanyPayrollService,
    PaymentMethodService,
    BankService,
    AccounttypeService,
    CostCenterService,
    AreaService,
    SubsidiaryService,
    PositionService,
    IdentificationTypeService,
    SpendingAccountService,
    AssistancetypeService,
    ProductService
  ],
  declarations: [],
 
})
export class CompanyServiceModule { }