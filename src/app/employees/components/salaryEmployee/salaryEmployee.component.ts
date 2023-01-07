import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { EmployeeSalaryService, EmployeeService, SalaryTypeService } from '../../services/employeeService.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import { SelectItem } from 'primeng/api';
import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../../companies/models/company.model';
import { SalaryType } from '../../models/salaryType.model';


import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployeeSalary } from '../../models/employeeSalary.model';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-CO';
import * as moment from 'moment';
registerLocaleData(localeEsAr);

@Component({
    selector: 'app-salaryEmployee',
    templateUrl: './salaryEmployee.component.html',
    styleUrls: ['./salaryEmployee.component.scss'],
    providers: [MessageService,ConfirmationService]
  })
  
  export class SalaryEmployeeComponent implements OnInit {
    
    
      @ViewChild('scroller1') scroller!: ElementRef;
      active = 1;
      items!: MenuItem[];
      activeItem!: MenuItem;
      scrollableItems!: MenuItem[];
      activeItem2!: MenuItem;
      employeeSalary: EmployeeSalary[] = [];
      imagenSubir!: File;
      imagenTemp!: string | ArrayBuffer;
      public date: Date = new Date();
      public dateI: Date = new Date();
      forma!: UntypedFormGroup;
      public company: any = {};
      public employeeSalaries: any = {};
      public employeeSalarie: any = {};
      public employeeSalarieActive: any = {};
      empresaseleccionada: any = {};
      empresa: any = {};
      fecha: any = {}
      //public costCenter: any= {};
      usuario: any = {};
      selectedEmployeeSalary: any = [];
      employeeSalaryDialog!: boolean;
      submitted!: boolean;
      salaryType: SalaryType[] = [];
      salaryTypes: any = {};
      new!: boolean;
    
  
      employeeSalaryNew: EmployeeSalary = new EmployeeSalary('', '', true, '', '', this.date, this.date,0,'',this.date,this.date);
  
  
    constructor(private fb: UntypedFormBuilder,
      public _employeeSalaryService: EmployeeSalaryService,
      public _salaryTypeService: SalaryTypeService,
      public _usuarioService: AuthService,
       public _companyService: CompanyService,
       public _router: Router,
       public activatedRoute: ActivatedRoute,
       private messageService: MessageService, 
       public _modalUploadServices: ModalUploadService,
       private confirmationService: ConfirmationService,
       public pageScrollServ: PageScrollService,
                @Inject(DOCUMENT) private document: any
    ) { 
  
      this.activatedRoute.params.subscribe( params =>{
          this.getEmployeesSalary( params[ 'id' ]);
          this.getEmployeesSalaryIsActive( params[ 'id' ]);
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
      
      /* this.activatedRoute.params.subscribe( params =>{
          this._modalUploadServices.notificacion
          .subscribe( () =>  this.getEmployeesRecurrentPayment( params[ 'id' ]));
        }); */
  
        this.getSalaryType();
        this.getAllSalaryType();
    
        this.pageScrollServ.scroll({
          document: this.document,
          scrollTarget: '.theEnd',
        });
        this.activatedRoute.params.subscribe( params =>{
          this._modalUploadServices.notificacion
          .subscribe( () => this.getEmployeesSalary( params[ 'id' ]));
        });
      


      }

  get salaryTypeNoValido(){return this.forma.get('salaryType')!.invalid && this.forma.get('salaryType')!.touched}
  get salaryNoValido(){return this.forma.get('salary')!.invalid && this.forma.get('salary')!.touched}
  get initialSalaryDateNoValido(){return this.forma.get('initialSalaryDate')!.invalid && this.forma.get('initialSalaryDate')!.touched}
  get endSalaryDateNoValido(){return this.forma.get('endSalaryDate')!.invalid && this.forma.get('endSalaryDate')!.touched}
  get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}
  
  crearFormulario(){

    this.forma = this.fb.group({
      salaryType       : ['', Validators.required],
      salary     : ['', Validators.required],
      initialSalaryDate:  ['', Validators.required],
      endSalaryDate    : ['', Validators.required],
      estado    : ['true']
     });
    }

    

    onScroll(event: HTMLElement, i:any) {
      this.pageScrollServ.scroll({
        scrollTarget: event,
        scrollOffset: 300,
        document: this.document
      });
  
      this.active = i
    } 
  
    getEmployeesSalary( id: string ) {
      this._employeeSalaryService.cargarEmployeeSalary( id )
          .subscribe( employeeSalaries => {
          this.employeeSalaries = employeeSalaries;
        
          });
  
    }

    getEmployeesSalaryIsActive( id: string ) {
      this._employeeSalaryService.cargarEmployeeSalaryIsActive( id )
          .subscribe( employeeSalariesActive => {
          this.employeeSalarieActive = employeeSalariesActive;
          let cambio = moment(this.employeeSalarieActive.endSalaryDate)
          
          this.fecha = moment(this.employeeSalarieActive.endSalaryDate).subtract(1, 'd').format('YYYY-MM-DD')
          });
  
    }
  
    getSalaryType() {
        this._salaryTypeService.cargarTipoSalario()
        .subscribe( resp => this.salaryType = resp);
      }
    
      getAllSalaryType() {
        this._salaryTypeService.cargarTipoSalario()
        .subscribe( resp => this.salaryTypes = resp);
      }
    
    
    hideDialog() {
      this.employeeSalaryDialog = false;
      this.submitted = false;
  }
  
  openNewEmployeeSalary() {
      this.employeeSalarie! = {};
      this.employeeSalarie.isActive="true";
      this.employeeSalarie.endSalaryDate="9999-12-31";
      this.submitted = false;
      this.employeeSalaryDialog = true;
      this.new= true;
  }
  
  
  editEmployeeSalary(employeeSalary: EmployeeSalary) {
      this.employeeSalarie = {...employeeSalary};
      this.employeeSalaryDialog = true;
      this.new= false;
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
              this._employeeSalaryService.actualizarEmployeeSalary( this.employeeSalarie )
              .subscribe( () =>  this.getEmployeesSalary(id));
              this.new = false;
              this.employeeSalaryDialog = false;
           
          } else {

            const employeeSalaryActive = new EmployeeSalary(
              this.usuario.id,
              this.usuario.id,
              false,
              this.employeeSalarieActive[0].SalaryType_id,
              this.employeeSalarieActive[0].employee_id,
              this.employeeSalarieActive[0].initialSalaryDate,
              this.fecha,
              this.employeeSalarieActive[0].salary,
              this.employeeSalarieActive[0].id,
              this.employeeSalarieActive[0].createdAt,
              this.date,

              
          );
          console.log('actualizar',employeeSalaryActive)
          this._employeeSalaryService.actualizarEmployeeSalary( employeeSalaryActive )
          .subscribe( () =>  this.getEmployeesSalaryIsActive(id));
    
      const employeeSalary = new EmployeeSalary(
        this.usuario.id,
        this.usuario.id,
        this.forma.value.estado,
        this.forma.value.salaryType,
        id,
        this.forma.value.initialSalaryDate,
        this.forma.value.endSalaryDate,
        this.forma.value.salary
        
        
        
    );


    this._employeeSalaryService.crearEmployeeSalary( employeeSalary )
              .subscribe( () =>  this.getEmployeesSalary(id));
              this.new = false;
              this.employeeSalaryDialog = false
  
      this.forma.reset();
       this.crearFormulario();
  
    }
      
  });
  }
  
  
    deleteEmployeeSalary(employeeSalary: EmployeeSalary) {
      this.confirmationService.confirm({
          message: 'Estas seguro de eliminar el salario' + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel:"Si",
          rejectLabel:"No",
          accept: () => {
              
              
  
              this._employeeSalaryService.borrarEmployeeSalary( employeeSalary.id! )
            
              .subscribe( resp => {
                  this.employeeSalaryDialog= false;
                  
                  this.activatedRoute.params.subscribe( params =>{
                      this._modalUploadServices.notificacion
                      .subscribe( () =>  this.getEmployeesSalary( params[ 'id' ]));
                    });
                  
                });
              //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
          }
      });
  } 
  
  
  }