import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { EmployeeSocialSecurityService, SocialSecurityEntityService, ContributorSubTypeService,
    ContributorTypeService } from '../../../services/employeeService.index';
import { ContributorType } from '../../../models/contributorType.model';
import { ContributorSubType } from '../../../models/contributorSubType.model';
import { SocialSecurityEntity } from '../../../models/socialSecurityEntity.model';
import { AuthService } from '../../../../auth/services/authservice.index';

@Component({
    selector: 'app-socialSecurity',
    templateUrl: './socialSecurity.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class SocialSecurityComponent implements OnInit, AfterViewInit {
    date!: Date;
    socialSecurityInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    socialSecurityEntityHealths: SocialSecurityEntity[] = [];
    socialSecurityEntityPensions: SocialSecurityEntity[] = [];
    socialSecurityEntitySeverances: SocialSecurityEntity[] = [];
    contributorSubTypes:  ContributorSubType[] = [];
    contributorTypes: ContributorType[] = [];
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                private changeDetector: ChangeDetectorRef,
                public _socialSecurityEntityService: SocialSecurityEntityService,
                public _contributorSubTypeService: ContributorSubTypeService,
                public _contributorTypeService: ContributorTypeService,
              
                ) { 
                  
                }


               

    ngOnInit() { 

        this.getAllContributorSubType();
        this.getAllContributorType();
        this.getAllSocialSecurityEntityHealth();
        this.getAllSocialSecurityEntityPension();
        this.getAllSocialSecurityEntitySeverance();

        this.socialSecurityInformation = this._employeeNewService.getEmployeeInformation().socialSecurityInformation;
    }


   
    getAllSocialSecurityEntityHealth()  {
        this._socialSecurityEntityService.obtenerEntidadSSPorTipo('EPS')
            .subscribe( socialSecurityEntityHealth => {
             
              this.socialSecurityEntityHealths = socialSecurityEntityHealth;
      });
      }

      getAllSocialSecurityEntityPension()  {
        this._socialSecurityEntityService.obtenerEntidadSSPorTipo('AFP')
            .subscribe( socialSecurityEntityPension => {
              this.socialSecurityEntityPensions = socialSecurityEntityPension;
      });
      }

      getAllSocialSecurityEntitySeverance()  {
        this._socialSecurityEntityService.obtenerEntidadSSPorTipo('CES')
            .subscribe( socialSecurityEntitySeverance => {
              this.socialSecurityEntitySeverances = socialSecurityEntitySeverance;
      });
      }

      getAllContributorSubType()  {
        this._contributorSubTypeService.cargarSubTipoCotizante()
            .subscribe( contributorSubType => {
              this.contributorSubTypes = contributorSubType;
      });
      }

      getAllContributorType()  {
        this._contributorTypeService.cargarTipoCotizante()
            .subscribe( contributorType => {
              this.contributorTypes = contributorType;
      });
      }
     

   

     

    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.socialSecurityInformation.contributorType && this.socialSecurityInformation.contributorSubType && this.socialSecurityInformation.entityHealth && this.socialSecurityInformation.entityPension && this.socialSecurityInformation.entitySeverance ) {
            this._employeeNewService.employeeInformation.socialSecurityInformation = this.socialSecurityInformation;
            this.router.navigate(['/employees/new/confirmation']);
        }
    }

    prevPage() {
        this.router.navigate(['/employees/new/payment']);
    }

  
    
    


}