import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { EmployeeContractService, ContractTypeService } from '../../services/employeeService.index';
import { Employee } from '../../models/employee.model';
import { EmployeeContract } from '../../models/employeeContract.model';
import { CompanyService } from '../../../companies/services/company/company.service';
import { ContractType } from '../../models/contractType.model';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../auth/services/authservice.index';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { IdentificationType } from '../../models/identificationType.model';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-CO';
import * as moment from 'moment';
registerLocaleData(localeEsAr);


@Component({
  selector: 'app-contractEmployee',
  templateUrl: './contractEmployee.component.html',
  styleUrls: ['./contractEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ContractEmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  public date: Date = new Date();
  public dateI: Date = new Date();
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  version = 'Angular: v' + VERSION.full;
  forma!: UntypedFormGroup;
  employeeContract: any = {};
  public employeesContract: any = {};
  public employeesContractActive: any = {};
  public employeeContracts: any = {};
  contractType: any = {};
  contractTypes: any = {};
  selectedEmployeesContract: any = [];
  empresaseleccionada: any = {};
  empresa: any = {};
  fecha: any = {}
  public company: any = {};
  //public costCenter: any= {};
  usuario: any = {};
  new!: boolean;
  employeeContractDialog!: boolean;
  submitted!: boolean;

  employeeContractNew: EmployeeContract = new EmployeeContract('', '', true, '', '', this.date, this.date, this.date, this.date, '');

  constructor(
              private fb: UntypedFormBuilder,
              public activatedRoute: ActivatedRoute,
              public _router: Router,
              public _usuarioService: AuthService,
              public _companyService: CompanyService,
              public _employeeContractService: EmployeeContractService,
              public _contractTypeService: ContractTypeService,
              public _modalUploadServices: ModalUploadService,
              public pageScrollServ: PageScrollService,

              @Inject(DOCUMENT) private document: any
              ) { 


                this.activatedRoute.params.subscribe( params =>{
                  this.getAllContractEmployees( params[ 'id' ]);
                  this.getAllContractEmployeesActive( params[ 'id' ]);
              }); 
          
              this.company = this._usuarioService.empresas;
              this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
              this.usuario = JSON.parse(localStorage.getItem('usuario')!);
              
          
              if ( this.empresaseleccionada ){
                this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
               
                
              } else {
                if(this.company.length > 1 ) {
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                } else {
                  this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                }
              }
          
              
               this.crearFormulario();
                 
              }



  ngOnInit(): void {

    this.getContractType()
    this.getAllContractType()

    this.activatedRoute.params.subscribe( params =>{
      this.getAllContractEmployees( params[ 'id' ]);
  }); 

  /*   this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarContractEmployees( params[ 'id' ]));
    }); */

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

  }

  get contractTypeNoValido(){return this.forma.get('contractType')!.invalid && this.forma.get('contractType')!.touched}
  get initialContractDateNoValido(){return this.forma.get('initialContractDate')!.invalid && this.forma.get('initialContractDate')!.touched}
  get endContractDateNoValido(){return this.forma.get('endContractDate')!.invalid && this.forma.get('endContractDate')!.touched}
  get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}

  crearFormulario(){

    this.forma = this.fb.group({
     
      contractType       : ['', Validators.required],
      initialContractDate:  ['', Validators.required],
      endContractDate    : ['', Validators.required],
      estado    : ['true']
     });
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
    this.employeeContractDialog = false;
    this.submitted = false;
}

openNewEmployeeContract() {
    this.employeeContracts! = {};
    this.employeeContracts.isActive="true";
    this.submitted = false;
    this.employeeContractDialog = true;
    this.new= true;
}

editEmployeeContract(employeeContract: EmployeeContract) {
  this.employeeContracts= {...employeeContract};
  this.employeeContractDialog = true;
  this.new= false;
}



  getAllContractEmployees( id: string ) {
    this._employeeContractService.cargarEmployeeContract( id )
        .subscribe( (employeeContract : any[]) => {
          this.employeesContract = employeeContract;
        });

  }

  getAllContractEmployeesActive( id: string ) {
    this._employeeContractService.cargarEmployeeContractActive( id )
        .subscribe( (employeeContractActive : any[]) => {
          this.employeesContractActive = employeeContractActive;
          console.log('contrattt', this.employeesContractActive)
          this.fecha = moment(this.employeesContractActive.endContractDate).subtract(1, 'd').format('YYYY-MM-DD')
        });

  }


  getContractType() {
    this._contractTypeService.cargarTipoContrato()
    .subscribe( resp => this.contractType = resp);
  }

  getAllContractType() {
    this._contractTypeService.cargarTipoContrato()
    .subscribe( resp => this.contractTypes = resp);
  }


  guardar(){
     
    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof UntypedFormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }

    this.activatedRoute.params.subscribe( params => {
        const id = params['id'];
        
        if ( this.new !== true) {
            this._employeeContractService.actualizarEmployeeContract( this.employeeContracts )
            .subscribe( () =>  this.getAllContractEmployees(id));
            this.new = false;
            this.employeeContractDialog = false;
         
        } else {

          const employeeContractActive = new EmployeeContract(
            this.usuario.id,
            this.usuario.id,
            false,
            this.employeesContractActive[0].contractType_id,
            this.employeesContractActive[0].employee_id,
            this.employeesContractActive[0].initialContractDate,
            this.fecha,
            this.employeesContractActive[0].createdAt,
            this.employeesContractActive[0].updatedAt,
            this.employeesContractActive[0].id,
        );
        console.log('actuazl', employeeContractActive )
        this._employeeContractService.actualizarEmployeeContract( employeeContractActive )
        .subscribe( () =>  this.getAllContractEmployeesActive(id));
  
    const employeeContract = new EmployeeContract(
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
      this.forma.value.contractType,
      id,
      this.forma.value.initialContractDate,
      this.forma.value.endContractDate,
  );


  this._employeeContractService.crearEmployeeContract( employeeContract  )
            .subscribe( () =>  this.getAllContractEmployees(id));
            this.new = false;
            this.employeeContractDialog = false

    this.forma.reset();
     this.crearFormulario();

  }
    
});
}

  


  actualizarImagen( employee: Employee ){
  
    this._modalUploadServices.mostrarModal('employee', employee.id! );
    
  }

 
  deleteEmployeeContract( employeeContract: EmployeeContract ){

  }

  

  

}