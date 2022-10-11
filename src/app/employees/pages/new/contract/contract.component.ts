import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { EmployeeContractService, ContractTypeService } from '../../../services/employeeService.index';
import { Employee } from '../../../models/employee.model';
import { EmployeeContract } from '../../../models/employeeContract.model';
import { AuthService } from '../../../../auth/services/authservice.index';
declare var $: any;
@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class ContractComponent implements OnInit, AfterViewInit {
    disabled: boolean = true;
    dateIni!: Date;
    dateEnd = new Date('December 31, 9999 03:24:00');
    contractInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    contractTypes: any = {};
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _contractTypeService: ContractTypeService,
                ) { 
                  
                }


               

    ngOnInit() { 

        this.getAllContractType()

        this.contractInformation = this._employeeNewService.getEmployeeInformation().contractInformation;
    }


   

    getAllContractType() {
        this._contractTypeService.cargarTipoContrato()
        .subscribe( resp => this.contractTypes = resp);
      }

     
      onSelect() {
        if (this.contractInformation.contractType === 'afdec5c1-b0fb-4fd9-a109-8158fe4c0600') {
         
           jQuery('#endContractDate').prop('inert', true )
            this.contractInformation.endContractDate = this.dateEnd
          
          
        }else{
             jQuery('#endContractDate').prop('inert', false )
            this.contractInformation.endContractDate = ''
            
        }
       
      }

      

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.contractInformation.contractType) {
            this._employeeNewService.employeeInformation.contractInformation = this.contractInformation;
            this.router.navigate(['/employees/new/salary']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/working']);
    }

  

    
    


}