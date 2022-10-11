import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoveltiesComponent } from './pages/novelties/novelties.component';
import { DefinitiveComponent } from './pages/definitive/definitive.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { CreateNoveltiesComponent } from './components/create-novelties/create-novelties.component';
import { SaveExtraHoursComponent } from './components/save-extra-hours/save-extra-hours.component';
import { SaveAbsenteeHistoryComponent } from './components/save-absentee-history/save-absentee-history.component';



@NgModule({
  declarations: [
    NoveltiesComponent,
    DefinitiveComponent,
    CreateNoveltiesComponent,
    SaveExtraHoursComponent,
    SaveAbsenteeHistoryComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule
  ]
})
export class PayrollModule { }
