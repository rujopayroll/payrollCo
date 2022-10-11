import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { CostCenterService } from '../../../../companies/services/costCenter/cost-center.service';
import { AreaService } from '../../../../companies/services/area/area.service';
import { PositionService } from '../../../../companies/services/position/position.service';
import { SubsidiaryService } from '../../../../companies/services/subsidiary/subsidiary.service';
import { CostCenter } from '../../../../companies/models/costCenter.model';
import { Area } from '../../../../companies/models/area.model';
import { Position } from '../../../../companies/models/position.model';
import { Subsidiary } from '../../../../companies/models/subsidiary.model';

import { AuthService } from '../../../../auth/services/authservice.index';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class JobComponent implements OnInit, AfterViewInit {
    date!: Date;
    jobInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    costCenters: CostCenter[] = [];
    areas: Area[]=[];
    positions: Position[]=[];
    subsidiarys: Subsidiary[]=[];
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _costCenterService: CostCenterService,
                public _areaService: AreaService,
                public _positionService: PositionService,
                public _subsidiaryService: SubsidiaryService,
                public _usuarioService: AuthService,
             
                ) { 

                    this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
                if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                  } else {
                    if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                  } else {
                   this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                   }

                 this.usuario = JSON.parse(localStorage.getItem('usuario')!);
                  
                }


               

    ngOnInit() { 

        this.getAllArea(this.empresa.id);
        this.getAllCostCenter(this.empresa.id);
        this.getAllPosition(this.empresa.id);
        this.getAllSubsidiary(this.empresa.id);

        this.jobInformation = this._employeeNewService.getEmployeeInformation().jobInformation;
    }


   
    getAllCostCenter(company: string)  {
        this._costCenterService.cargarCostCenterCompanyActive( company )
            .subscribe( costCenter => {
              this.costCenters = costCenter;
      });
      }

      getAllArea( company: string)  {
        this._areaService.cargarAreaCompanyActive( company)
            .subscribe( area => {
              this.areas = area;
      });
      }

      getAllPosition( company: string)  {
        this._positionService.cargarPositionCompanyActive( company )
            .subscribe( position => {
              this.positions = position;
      });
      }

      getAllSubsidiary( company: string)  {
        this._subsidiaryService.cargarSubsidiaryCompanyActive( company )
            .subscribe( subsidiary => {
              this.subsidiarys = subsidiary;
      });
      }
     

   

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.jobInformation.costCenter && this.jobInformation.area && this.jobInformation.subsidiary && this.jobInformation.position ) {
            this._employeeNewService.employeeInformation.jobInformation = this.jobInformation;
            this.router.navigate(['/employees/new/payment']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/salary']);
    }

  
    
    


}