import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { EmployeeSalaryService, EmployeeService, SalaryTypeService } from '../../../services/employeeService.index';
import { Employee } from '../../../models/employee.model';
import { SalaryType } from '../../../models/salaryType.model';
import { AuthService } from '../../../../auth/services/authservice.index';
declare var $: any;
@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class SalaryComponent implements OnInit, AfterViewInit {
    disabled: boolean = true;
    dateIni!: Date;
    dateEnd = new Date('December 31, 9999 03:24:00');
    salaryInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    salaryTypes: any = {};
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _salaryTypeService: SalaryTypeService,
                ) { 
                  
                }


               

    ngOnInit() { 

        this.getAllSalaryType();
        this.salaryInformation = this._employeeNewService.getEmployeeInformation().salaryInformation;
        this.salaryInformation.endContractDate = this.dateEnd
    }


    getAllSalaryType() {
        this._salaryTypeService.cargarTipoSalario()
        .subscribe( resp => this.salaryTypes = resp);
      }

      

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.salaryInformation.salaryType) {
            this._employeeNewService.employeeInformation.salaryInformation = this.salaryInformation;
            this.router.navigate(['/employees/new/job']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/contract']);
    }

    onSelect() {
     
      this.salaryInformation.endSalaryDate = this.dateEnd
    }
    
    


}