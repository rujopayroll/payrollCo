import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CostCenterComponent } from './components/costCenter/costCenter.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { AreaComponent } from './components/area/area.component';
import { SubsidiaryComponent } from './components/subsidiary/subsidiary.component';
import { PositionComponent } from './components/position/position.component';
import { InfoCompanyComponent } from './components/infoCompany/infoCompany.component'
import { PaymentCompanyComponent } from './components/paymentCompany/paymentCompany.component'
import { PayrollCompanyComponent } from './components/payrollCompany/payrollCompany.component';
import { ConceptComponent } from './components/concept/concept.component';





@NgModule({
  declarations: [
    CompaniesComponent,
    CostCenterComponent,
    AreaComponent,
    SubsidiaryComponent,
    PositionComponent,
    PaymentCompanyComponent,
    PayrollCompanyComponent,
    ConceptComponent,
    InfoCompanyComponent,
   
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    
    
  ]
})
export class CompaniesModule { }
