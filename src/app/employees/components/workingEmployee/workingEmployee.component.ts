import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { EmployeeWorkingService, EmployeeTypeService, ContractRegimeService, WorkPlaceRisksService, WorkingHourService
         } from '../../services/employeeService.index';
import { EmployeeWorking } from '../../models/employeeWorking.model';
import { ContractRegime } from '../../models/contractRegime.model';
import { EmployeeType} from '../../models/employeeType.model';
import { WorkPlaceRisks } from '../../models/workPlaceRisks.model';
import { WorkingHour } from '../../models/workingHour.model';
import { AuthService } from '../../../auth/services/authservice.index';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-workingEmployee',
  templateUrl: './workingEmployee.component.html',
  styleUrls: ['./workingEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class WorkingEmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  forma!: UntypedFormGroup;
  public date: Date = new Date();
  active = 1;
  isActive = true;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  empresaseleccionada: any = {};
  public company: any = {};
  empresa: any = {};
  usuario: any = {};
  version = 'Angular: v' + VERSION.full;
  registro: any = {};
  submitted!: boolean;
  new!: boolean;
  //employeeWorking: any = {};
  public employeeW: any = {};
  employeesWorking: any= {};
  employeesWorkings: any= {};
  employeeType: any = {};
  contractRegime: any = {};
  workingHour: any = {};
  workPlaceRisk: any = {};
  workingEmployeeDialog!: boolean;
  employeeTypes: EmployeeType[] = [];
  contractRegimes: ContractRegime[]=[];
  workingHours: WorkingHour[]= [];
  workPlaceRisks: WorkPlaceRisks[] = [];
  Id: any;
  
  employeeWorking: EmployeeWorking = new EmployeeWorking('', '', true, '', '', '', '', true, true, this.date, this.date);

  constructor(private fb: UntypedFormBuilder,
              public _router: Router,
              public activatedRoute: ActivatedRoute,
              public _usuarioService: AuthService,
              public _employeeWorkingService: EmployeeWorkingService,
              public _employeeTypeService: EmployeeTypeService,
              public _contractRegimeService: ContractRegimeService,
              public _workingHourService: WorkingHourService,
              public _workPlaceRisksService: WorkPlaceRisksService,
              public _modalUploadServices: ModalUploadService,
              public pageScrollServ: PageScrollService,
              @Inject(DOCUMENT) private document: any
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

                 this.activatedRoute.params.subscribe( params =>{
                  this.Id = params[ 'id' ]
                  this.cargarEmployeesWorking( params[ 'id' ]);
              }); 

              this.crearFormulario();

              }

  ngOnInit(): void {

    this.getAllEmployeeType();
    this.getAllContractRegime();
    this.getAllWorkPlaceRisks();
    this.getAllWorkingHour();

    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      this.Id = params[ 'id' ]
      .subscribe( () =>  this.cargarEmployeesWorking( params[ 'id' ]));
    });

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

   
    
  }

  get contractRegimeNoValido(){return this.forma.get('contractRegime')!.invalid && this.forma.get('contractRegime')!.touched}
  get employeeTypeNoValido(){return this.forma.get('employeeType')!.invalid && this.forma.get('employeeType')!.touched}
  get workPlaceRisksNoValido(){return this.forma.get('workPlaceRisks')!.invalid && this.forma.get('workPlaceRisks')!.touched}
  get workingHourNoValido(){return this.forma.get('workingHour')!.invalid && this.forma.get('workingHour')!.touched}
  get transportAssistanceNoValido(){return this.forma.get('transportAssistance')!.invalid && this.forma.get('transportAssistance')!.touched}
  get variableSalaryNoValido(){return this.forma.get('variableSalary')!.invalid && this.forma.get('variableSalary')!.touched}



  crearFormulario(){

    this.forma = this.fb.group({
      contractRegime     : ['', Validators.required],
      employeeType   : ['', Validators.required],
      workPlaceRisks     : ['', Validators.required],
      workingHour     : ['', Validators.required],
      transportAssistance   : ['', Validators.required],
      variableSalary   : ['', Validators.required]
     });
    }


    guardar(workingEmployee: EmployeeWorking){

      if (this.forma.invalid){
    
        console.log('invalido')
    
        return Object.values (this.forma.controls).forEach( control =>{
    
          if (control instanceof UntypedFormGroup) {
            Object.values (control.controls).forEach( control => control.markAsTouched());
    
          } else{
            control.markAsTouched();
          }
          
    
        });
      }
  
    
      this.activatedRoute.params.subscribe( params => {
        const Id = params[ 'id' ];
    
  
      let form = [
        {
    
          createUser: this.usuario,
          updateUser: this.usuario,
          isActive: this.isActive,
          id: Id,
          contractRegime_id: this.forma.value.contractRegime,
          employeeType_id: this.forma.value.employeeType,
          workPlaceRisks_id:  this.forma.value.workPlaceRisks,
          workingHour_id:  this.forma.value.workingHour,
          transportAssistance: this.forma.value.transportAssistance,
          variableSalary: this.forma.value.variableSalary
         
  
        }
      ]
   
    
      this.registro =  JSON.parse(JSON.stringify(form[0]));
      console.log('registro', this.registro)
  
      this._employeeWorkingService.actualizarEmployeeWorking( this.employeeW )
              .subscribe( () => this.cargarEmployeesWorking(this.employeeW.id));
              this.workingEmployeeDialog = false;
      
      
    
      // this.forma.reset();
    }) 
    }


  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 300,
      document: this.document
    });

    this.active = i;
  } 

  hideDialog() {
    this.workingEmployeeDialog = false;
    this.submitted = false;
}

editWorkingEmployee(workingEmployee: EmployeeWorking) {
  this.employeesWorkings = {...workingEmployee};
  this.workingEmployeeDialog = true;
  this.new= false;
}

  cargarEmployeesWorking( id: string ) {
    this._employeeWorkingService.cargarEmployeeWorking( id )
        .subscribe( employeeWorking => {

          this.employeeW = employeeWorking[0];
        
          if (this.employeeW) {
           
            this.getEmployeeType( this.employeeW.employeeType_id );
            this.getContractRegime( this.employeeW.contractRegime_id);
            this.getWorkingHour( this.employeeW.workingHour_id);
            this.getWorkPlaceRisks( this.employeeW.workPlaceRisks_id);
            
          } 
        });

  }


  getEmployeeType( id: string)  {
    this._employeeTypeService.obtenerTipoEmpleado( id )
        .subscribe( employeeType => {
          this.employeeType = employeeType;
  });
  }

  getAllEmployeeType()  {
    this._employeeTypeService.cargarTipoEmpleado()
        .subscribe( employeeType => {
          this.employeeTypes = employeeType;
  });
  }
  
  getContractRegime( id: string)  {
    this._contractRegimeService.obtenerTipoRegime( id )
        .subscribe( contractRegime => {
          this.contractRegime = contractRegime;
         
  });
  }

  getAllContractRegime()  {
    this._contractRegimeService.cargarTipoRegimen( )
        .subscribe( contractRegime => {
          this.contractRegimes = contractRegime;
         
  });
  }

  getWorkingHour( id: string)  {
    this._workingHourService.obtenerHorarioLaboral( id )
        .subscribe( workingHour => {
          this.workingHour = workingHour;
  });
  }

  getAllWorkingHour()  {
    this._workingHourService.cargarHorarioLaboral()
        .subscribe( workingHour => {
          this.workingHours = workingHour;
  });
  }
  
  getWorkPlaceRisks( id: string)  {
    this._workPlaceRisksService.obtenerCentroTrabajo( id )
        .subscribe( workPlaceRisks => {
          this.workPlaceRisk = workPlaceRisks;
  });
  }

  getAllWorkPlaceRisks()  {
    this._workPlaceRisksService.cargarCentroTrabajo()
        .subscribe( workPlaceRisks => {
          this.workPlaceRisks = workPlaceRisks;
  });
  }
  

  
  
}