import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewComponent} from './new.component';
import { NewEmployeeRoutingModule } from './new-routing.module';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';


import { PersonalComponent } from './personal/personal.component';
import { WorkingComponent } from './working/working.component';
import { ContractComponent } from './contract/contract.component';
import { SalaryComponent } from './salary/salary.component';
import { JobComponent } from './job/job.component';
import { PaymentComponent } from './payment/payment.component';
import { SocialSecurityComponent } from './socialSecurity/socialSecurity.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeNewService } from '../../services/employeeNew/employee-new.service';
import { PrimeNGModule } from '../../../prime-ng/prime-ng.module';

@NgModule({
	imports: [
		CommonModule,
		NewEmployeeRoutingModule,
		FormsModule,
        SharedModule,
        PrimeNGModule
	],
	declarations: [
		NewComponent,
		PersonalComponent,
		WorkingComponent,
		ContractComponent,
		SalaryComponent,
		JobComponent,
		PaymentComponent,
		SocialSecurityComponent,
		ConfirmationComponent 
	
	],
	providers: [
		EmployeeNewService
	]
})
export class NewEmployeeModule {}