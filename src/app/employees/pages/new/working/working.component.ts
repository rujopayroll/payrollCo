import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { EmployeeWorkingService, EmployeeTypeService, ContractRegimeService, WorkPlaceRisksService, WorkingHourService
} from '../../../services/employeeService.index';
import { EmployeeWorking } from '../../../models/employeeWorking.model';
import { ContractRegime } from '../../../models/contractRegime.model';
import { EmployeeType} from '../../../models/employeeType.model';
import { WorkPlaceRisks } from '../../../models/workPlaceRisks.model';
import { WorkingHour } from '../../../models/workingHour.model';
import { AuthService } from '../../../../auth/services/authservice.index';

@Component({
    selector: 'app-working',
    templateUrl: './working.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class WorkingComponent implements OnInit, AfterViewInit {
    date!: Date;
    workingInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    employeeTypes: EmployeeType[] = [];
    contractRegimes: ContractRegime[]=[];
    workingHours: WorkingHour[]= [];
    workPlaceRisks: WorkPlaceRisks[] = [];
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _employeeWorkingService: EmployeeWorkingService,
              public _employeeTypeService: EmployeeTypeService,
              public _contractRegimeService: ContractRegimeService,
              public _workingHourService: WorkingHourService,
              public _workPlaceRisksService: WorkPlaceRisksService,
                ) { 
                  
                }


               

    ngOnInit() { 

        this.getAllEmployeeType();
        this.getAllContractRegime();
        this.getAllWorkPlaceRisks();
        this.getAllWorkingHour();

        this.workingInformation = this._employeeNewService.getEmployeeInformation().workingInformation;
    }


    getAllEmployeeType()  {
        this._employeeTypeService.cargarTipoEmpleado()
            .subscribe( employeeType => {
              this.employeeTypes = employeeType;
      });
      }

      getAllContractRegime()  {
        this._contractRegimeService.cargarTipoRegimen( )
            .subscribe( contractRegime => {
              this.contractRegimes = contractRegime;
             
      });
      }

      getAllWorkingHour()  {
        this._workingHourService.cargarHorarioLaboral()
            .subscribe( workingHour => {
              this.workingHours = workingHour;
      });
      }

      getAllWorkPlaceRisks()  {
        this._workPlaceRisksService.cargarCentroTrabajo()
            .subscribe( workPlaceRisks => {
              this.workPlaceRisks = workPlaceRisks;
      });
      }

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.workingInformation.contractRegime) {
            this._employeeNewService.employeeInformation.workingInformation = this.workingInformation;
            this.router.navigate(['/employees/new/contract']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/personal']);
    }

  
    
    


}