import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { NewComponent } from './new.component';
import { PersonalComponent } from './personal/personal.component';
import { WorkingComponent } from './working/working.component';
import { ContractComponent } from './contract/contract.component';
import { SalaryComponent } from './salary/salary.component';
import { JobComponent } from './job/job.component';
import { PaymentComponent } from './payment/payment.component';
import { SocialSecurityComponent } from './socialSecurity/socialSecurity.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: NewComponent, children:[
				{path:'', redirectTo: 'new/personal', pathMatch: 'full'},
				{path: 'new/personal', component: PersonalComponent},
				{path: 'new/working', component: WorkingComponent},
				{path: 'new/contract', component: ContractComponent},
				{path: 'new/salary', component: SalaryComponent},
				{path: 'new/job', component: JobComponent},
				{path: 'new/payment', component: PaymentComponent},
				{path: 'new/socialSecurity', component: SocialSecurityComponent},
				{path: 'new/confirmation', component: ConfirmationComponent},
			]}
		])
	],
	exports: [
		RouterModule
	]
})
export class NewEmployeeRoutingModule {}