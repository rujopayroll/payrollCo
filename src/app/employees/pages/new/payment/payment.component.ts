import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { Bank } from '../../../../companies/models/bank.model';
import { AccountType } from '../../../../companies/models/accountType.model';
import { BankService } from '../../../../companies/services/bank/bank.service';
import { AccounttypeService } from '../../../../companies/services/AccountType/accounttype.service';
import { AuthService } from '../../../../auth/services/authservice.index';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class PaymentComponent implements OnInit, AfterViewInit {
    date!: Date;
    paymentInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    banks: Bank[]=[];
    accountTypes: AccountType[]= [];
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _bankService: BankService,
                public _accountTypeService: AccounttypeService,
                ) { 
                  
                }


               

    ngOnInit() { 

       
        this.getAllAccountType();
        this.getAllBank();
        this.paymentInformation = this._employeeNewService.getEmployeeInformation().paymentInformation;
    }


   
    getAllBank()  {
        this._bankService.cargarBancos()
            .subscribe( bank => {
              this.banks = bank;
      });
      }

      getAllAccountType()  {
        this._accountTypeService.cargarTipoCuentas()
            .subscribe( accountType => {
              this.accountTypes = accountType;
      });
      }
     

     

      

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.paymentInformation.bank && this.paymentInformation.accountType && this.paymentInformation.accountNumber) {
            this._employeeNewService.employeeInformation.paymentInformation = this.paymentInformation;
            this.router.navigate(['/employees/new/socialSecurity']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/job']);
    }

  
    
    


}