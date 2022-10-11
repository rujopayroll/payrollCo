

import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { EmployeeService, IdentificationTypeService, GenderService, CountryService, StateService, 
    CityService } from '../../../services/employeeService.index';
import { EmployeeWorkingService, EmployeeTypeService, ContractRegimeService, WorkPlaceRisksService, WorkingHourService
    } from '../../../services/employeeService.index';
import { EmployeeSocialSecurityService, SocialSecurityEntityService, ContributorSubTypeService,
        ContributorTypeService, EmployeeContractService, EmployeeSalaryService } from '../../../services/employeeService.index';
import { SalaryTypeService } from '../../../services/employeeService.index';
import { BankService } from '../../../../companies/services/bank/bank.service';
import { AccounttypeService } from '../../../../companies/services/AccountType/accounttype.service';
import { CostCenterService } from '../../../../companies/services/costCenter/cost-center.service';
import { AreaService } from '../../../../companies/services/area/area.service';
import { PositionService } from '../../../../companies/services/position/position.service';
import { SubsidiaryService } from '../../../../companies/services/subsidiary/subsidiary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractTypeService } from '../../../services/employeeService.index';
import { Employee } from '../../../models/employee.model';
import { EmployeeContract } from '../../../models/employeeContract.model';
import { AuthService } from '../../../../auth/services/authservice.index';
import { PersonalComponent } from '../personal/personal.component';
import { EmployeeJobService } from '../../../services/employeeJob/employee-job.service';
import { EmployeePaymentService } from '../../../services/employeePayment/employee-payment.service';
declare var $: any;
@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class ConfirmationComponent implements OnInit {
    
    employeeInformation: any;
    identificationType: any = {}
    gender: any = {}
    country: any  = {};
    state: any = {};
    city: any = {};
    employeeType: any = {};
    contractRegime: any = {};
    workingHour: any = {};
    workPlaceRisk: any = {};
    costCenter: any = {};
    area: any = {};
    position: any = {};
    subsidiary: any = {};
    socialSecurityEntitySeverance: any = {};
    socialSecurityEntityHealth: any = {};
    socialSecurityEntityPension: any = {};
    contributorSubType: any = {};
    contributorType: any = {};
    bank: any = {};
    accountType: any = {};
    contractType: any = {};
    salaryType: any = {};
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    registro: any = {};
    registroW: any = {};
    registroJ: any = {};
    registroP: any = {};
    registroS: any = {};
    registroSal: any = {};
    registroC: any = {};
    employees: Employee[] = [];
    
    constructor( public _employeeNewService : EmployeeNewService, 
                private router: Router,
                public activatedRoute: ActivatedRoute,
                public _identificationTypeService: IdentificationTypeService,
                public _genderService: GenderService,
                public _countryService: CountryService,
                public _stateService: StateService,
                public _cityService: CityService,
                public _employeeTypeService: EmployeeTypeService,
                public _contractRegimeService: ContractRegimeService,
                public _workingHourService: WorkingHourService,
                public _workPlaceRisksService: WorkPlaceRisksService,
                public _costCenterService: CostCenterService,
                public _areaService: AreaService,
                public _positionService: PositionService,
                public _subsidiaryService: SubsidiaryService,
                public _socialSecurityEntityService: SocialSecurityEntityService,
                public _contributorSubTypeService: ContributorSubTypeService,
                public _contributorTypeService: ContributorTypeService,
                public _bankService: BankService,
                public _accountTypeService: AccounttypeService,
                public _contractTypeService: ContractTypeService,
                public _salaryTypeService: SalaryTypeService,
                public _usuarioService: AuthService,
                public _employeeService: EmployeeService,
                public _employeeWorkingService: EmployeeWorkingService,
                public _employeeJobService: EmployeeJobService,
                public _employeePaymentService: EmployeePaymentService,
                public _employeeSocialSecurityService: EmployeeSocialSecurityService,
                public _employeeSalaryService: EmployeeSalaryService,
                public _employeeContractService: EmployeeContractService) { 


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
        
        this.employeeInformation = this._employeeNewService.employeeInformation;
        this.getIdentificationType(this.employeeInformation.personalInformation.tipodoc);
        this.getGender(this.employeeInformation.personalInformation.genero);
        this.getCountry(this.employeeInformation.personalInformation.paisr );
        this.getState(this.employeeInformation.personalInformation.deptor);
        this.getCity(this.employeeInformation.personalInformation.ciudadr);
        this.getEmployeeType(this.employeeInformation.workingInformation.employeeType );
        this.getContractRegime(this.employeeInformation.workingInformation.contractRegime);
        this.getWorkingHour(this.employeeInformation.workingInformation.workingHour);
        this.getWorkPlaceRisks(this.employeeInformation.workingInformation.workPlaceRisks)
        this.getCostCenter(this.employeeInformation.jobInformation.costCenter);
        this.getArea(this.employeeInformation.jobInformation.area);
        this.getPosition(this.employeeInformation.jobInformation.position);
        this.getSubsidiary(this.employeeInformation.jobInformation.subsidiary)
        this.getSocialSecurityEntityHealth(this.employeeInformation.socialSecurityInformation.entityHealth);
        this.getSocialSecurityEntityPension(this.employeeInformation.socialSecurityInformation.entityPension);
        this.getSocialSecurityEntitySeverance(this.employeeInformation.socialSecurityInformation.entitySeverance);
        this.getContributorType(this.employeeInformation.socialSecurityInformation.contributorType);
        this.getContributorSubType(this.employeeInformation.socialSecurityInformation.contributorSubType);
        this.getBank(this.employeeInformation.paymentInformation.bank);
        this.getAccountType(this.employeeInformation.paymentInformation.accountType);
        this.getContractType(this.employeeInformation.contractInformation.contractType);
        this.getSalaryType(this.employeeInformation.salaryInformation.salaryType)
       
    }

    getIdentificationType( id: string)  {
        this._identificationTypeService.obtenerTipoDocumentos( id )
            .subscribe( identificationType => {
              this.identificationType = identificationType;
      });
      }

      getGender( id: string)  {
        this._genderService.obtenerGenero( id )
            .subscribe( gender => {
              this.gender = gender;
      });
      }

      getCountry( id: string)  {
        this._countryService.obtenerPaises( id )
            .subscribe( country => {
              this.country = country;
              
      });
    }

    getState( id: string)  {
        this._stateService.obtenerDepartamento( id )
            .subscribe( state => {
              this.state = state;
      });
      }

      getCity( id: string)  {
        this._cityService.obtenerMunicipio( id )
            .subscribe( city => {
              this.city = city;
      });
      }

      getEmployees( id: string ) {
    
        this._employeeService.cargarEmployeeCompany( id)
            .subscribe( (employee: any) => {
             
              this.employees = employee;
             
            });
    
      }


      getEmployeeType( id: string)  {
        this._employeeTypeService.obtenerTipoEmpleado( id )
            .subscribe( employeeType => {
              this.employeeType = employeeType;
      });
      }

      getContractRegime( id: string)  {
        this._contractRegimeService.obtenerTipoRegime( id )
            .subscribe( contractRegime => {
              this.contractRegime = contractRegime;
             
      });
      }

      getWorkingHour( id: string)  {
        this._workingHourService.obtenerHorarioLaboral( id )
            .subscribe( workingHour => {
              this.workingHour = workingHour;
      });
      }

      getWorkPlaceRisks( id: string)  {
        this._workPlaceRisksService.obtenerCentroTrabajo( id )
            .subscribe( workPlaceRisks => {
              this.workPlaceRisk = workPlaceRisks;
      });
      }

      getCostCenter( id: string)  {
        this._costCenterService.obtenerCostCenter( id )
            .subscribe( costCenter => {
              this.costCenter = costCenter;
      });
      }

      getArea( id: string)  {
        this._areaService.obtenerArea( id )
            .subscribe( area => {
              this.area = area;
      });
      }

      getPosition( id: string)  {
        this._positionService.obtenerPosition( id )
            .subscribe( position => {
              this.position = position;
      });
      }

      getSubsidiary( id: string)  {
        this._subsidiaryService.obtenerSubsidiary( id )
            .subscribe( subsidiary => {
              this.subsidiary = subsidiary;
      });
      }

      getSocialSecurityEntityHealth( id: string)  {
        this._socialSecurityEntityService.obtenerEntidadSS(id)
            .subscribe( socialSecurityEntityHealth => {
             
              this.socialSecurityEntityHealth = socialSecurityEntityHealth;
      });
      }

      getSocialSecurityEntityPension( id: string)  {
        this._socialSecurityEntityService.obtenerEntidadSS( id )
            .subscribe( socialSecurityEntityPension => {
              this.socialSecurityEntityPension = socialSecurityEntityPension;
      });
      }

      getSocialSecurityEntitySeverance( id: string)  {
        this._socialSecurityEntityService.obtenerEntidadSS( id )
            .subscribe( socialSecurityEntitySeverance => {
              this.socialSecurityEntitySeverance = socialSecurityEntitySeverance;
      });
      }

      getContributorSubType( id: string)  {
        this._contributorSubTypeService.obtenerSubTipoCotizante( id )
            .subscribe( contributorSubType => {
              this.contributorSubType = contributorSubType;
      });
      }

      getContributorType( id: string)  {
        this._contributorTypeService.obtenerTipoCotizante( id )
            .subscribe( contributorType => {
              this.contributorType = contributorType;
      });
      }

      getBank( id: string)  {
        this._bankService.obtenerBanco( id )
            .subscribe( bank => {
              this.bank = bank;
      });
      }
    
      
      getAccountType( id: string)  {
        this._accountTypeService.obtenerTipoCuenta( id )
            .subscribe( accountType => {
              this.accountType = accountType;
      });
      }
    
      getContractType(id: string) {
        this._contractTypeService.obtenerTipoContrato( id )
        .subscribe( resp => this.contractType = resp);
      }

      getSalaryType( id: string ) {
        this._salaryTypeService.obtenerTipoSalario( id )
        .subscribe( resp => this.salaryType = resp);
      }

    complete() {

  let formP = [
   {        
      firstName:  this.employeeInformation.personalInformation.pnombre,
      secondName:  this.employeeInformation.personalInformation.snombre,
      surname:  this.employeeInformation.personalInformation.papellido,
      secondSurName: this.employeeInformation.personalInformation.sapellido,
      birthDate: this.employeeInformation.personalInformation.fnacimiento,
      company_id: this.empresa.id,
      email: this.employeeInformation.personalInformation.email,
      createUser: this.usuario.id,
      isActive: true,
      identification: this.employeeInformation.personalInformation.documento,
      city_id: this.employeeInformation.personalInformation.ciudadr,
      gender_id: this.employeeInformation.personalInformation.genero,
      address: this.employeeInformation.personalInformation.direccion,
      phone: this.employeeInformation.personalInformation.telefono,
      cellPhone: this.employeeInformation.personalInformation.celular,
      state_id: this.employeeInformation.personalInformation.deptor,
      country_id: this.employeeInformation.personalInformation.paisr,
      identificationType_id:  this.employeeInformation.personalInformation.tipodoc
    }
      ]

      this.registro =  JSON.parse(JSON.stringify(formP[0]));
      console.log('empleado', this.registro)
      this._employeeService.crearEmployee( this.registro )
          .subscribe( resp => {

            let formW = [
              {        
                createUser: this.usuario.id,
                isActive: true,
                id: resp.id,
                contractRegime_id: this.employeeInformation.workingInformation.contractRegime,
                employeeType_id: this.employeeInformation.workingInformation.employeeType,
                workPlaceRisks_id:  this.employeeInformation.workingInformation.workPlaceRisks,
                workingHour_id:  this.employeeInformation.workingInformation.workingHour,
                transportAssistance: this.employeeInformation.workingInformation.transportAssistance,
                variableSalary: this.employeeInformation.workingInformation.variableSalary
               }
                 ]

                 let formJ = [
                  {        
                    createUser: this.usuario.id,
                    isActive: true,
                    id: resp.id,
                    costCenter_id: this.employeeInformation.jobInformation.costCenter,
                    area_id: this.employeeInformation.jobInformation.area,
                    subsidiary_id: this.employeeInformation.jobInformation.subsidiary,
                     position_id: this.employeeInformation.jobInformation.position
                   }
                     ]

                     let formPay = [
                      {        
                        createUser: this.usuario.id,
                        isActive: true,
                        bank_id: this.employeeInformation.paymentInformation.bank,
                        accountType_id: this.employeeInformation.paymentInformation.accountType,
                        id:resp.id,
                        accountNumber: this.employeeInformation.paymentInformation.accountNumber
                       }
                           ]

                           let formS = [
                            {        
                              createUser: this.usuario.id,
                              isActive: true,
                              id: resp.id,
                              contributorType_id: this.employeeInformation.socialSecurityInformation.contributorType,
                              contributorSubType_id: this.employeeInformation.socialSecurityInformation.contributorSubType,
                              entityHealth_id: this.employeeInformation.socialSecurityInformation.entityHealth,
                              entityPension_id: this.employeeInformation.socialSecurityInformation.entityPension,
                              entitySeverance_id: this.employeeInformation.socialSecurityInformation.entitySeverance
                            }
                            ]

                            let formC = [
                              {        
                                createUser: this.usuario.id,
                                isActive: true,
                                contractType_id: this.employeeInformation.contractInformation.contractType,
                                employee_id: resp.id,
                                initialContractDate: this.employeeInformation.contractInformation.initialContractDate,
                                endContractDate: this.employeeInformation.contractInformation.endContractDate,
                              }
                              ]


                              let formSal = [
                                {        
                                  createUser: this.usuario.id,
                                  isActive: true,
                                  salaryType_id: this.employeeInformation.salaryInformation.salaryType,
                                  employee_id: resp.id,
                                  initialSalaryDate: this.employeeInformation.salaryInformation.initialSalaryDate,
                                  endSalaryDate: this.employeeInformation.salaryInformation.endSalaryDate,
                                  salary: this.employeeInformation.salaryInformation.salary
                                }
                                ]

                 this.registroW =  JSON.parse(JSON.stringify(formW[0]));
                 console.log('working',this.registroW )
                 this._employeeWorkingService.crearEmployeeWorking( this.registroW )
                    .subscribe( respW => {
                    });

                  this.registroJ =  JSON.parse(JSON.stringify(formJ[0]));
                  this._employeeJobService.crearEmployeeJob(  this.registroJ )
                      .subscribe( respJ => {
                      });
                                        
                  this.registroP =  JSON.parse(JSON.stringify(formPay[0]));
                  this._employeePaymentService.crearEmployeePayment(  this.registroP )
                      .subscribe( respPay => {
                      });
                                                       

                  this.registroS =  JSON.parse(JSON.stringify(formS[0]));
                  this._employeeSocialSecurityService.crearEmployeeSocialSecurity(  this.registroS )
                      .subscribe( respS => {
                      });  
                                                                 

                  this.registroC =  JSON.parse(JSON.stringify(formC[0]));
                  this._employeeContractService.crearEmployeeContract(  this.registroC )
                      .subscribe( respC => {
                      });
                                                                           


                  this.registroSal =  JSON.parse(JSON.stringify(formSal[0]));
                  this._employeeSalaryService.crearEmployeeSalary(  this.registroSal )
                        .subscribe( respSal => {
                    /* this.getEmployees( this.empresa.id ); */
                  this.router.navigate(['/employees/list']);
                           });

                                                                                                                 
          })

          this._employeeNewService.complete();
      }
      
   
    
      // this.forma.reset();
    
    


//el codigo para guardar


        

    prevPage() {
        this.router.navigate(['/employees/new/socialSecurity']);
    }
}