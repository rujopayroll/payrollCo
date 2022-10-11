import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { EmployeeRecurrentPaymentService, EmployeeService } from '../../services/employeeService.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import { ConceptService } from '../../../companies/services/concept/concept.service';
import { SelectItem } from 'primeng/api';
import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../../companies/models/company.model';
import { Concept } from '../../../companies/models/concept.model';

import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployeeRecurrentPayment } from '../../models/employeeRecurrentPayment.model';





@Component({
  selector: 'app-recurrentPaymentEmployee',
  templateUrl: './recurrentPaymentEmployee.component.html',
  styleUrls: ['./recurrentPaymentEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})

export class RecurrentPaymentEmployeeComponent implements OnInit {
  
  
    @ViewChild('scroller1') scroller!: ElementRef;
    active = 1;
    items!: MenuItem[];
    activeItem!: MenuItem;
    scrollableItems!: MenuItem[];
    activeItem2!: MenuItem;
    employeeRecurrentPayment: EmployeeRecurrentPayment[] = [];
    imagenSubir!: File;
    imagenTemp!: string | ArrayBuffer;
    public date: Date = new Date();
    forma!: UntypedFormGroup;
    public company: any = {};
    public employeeRecurrentPayments: any = {};
    public recurrentPayments: any = {};
    public recurrentPayments1: any = {};
    public recurrentPayments2: any = {};
    empresaseleccionada: any = {};
    employeeRecurrentPay: any = {};
    empresa: any = {};
    concepto: Concept[]= [];
    //public costCenter: any= {};
    usuario: any = {};
    selectedRecurrentPayment: any = [];
    recurrentPaymentDialog!: boolean;
    submitted!: boolean;
    concepts: any = [];
    new!: boolean;

    recurrentPaymentNew: EmployeeRecurrentPayment = new EmployeeRecurrentPayment('', '', true, '', '', 0, this.date, this.date, '' );


  constructor(private fb: UntypedFormBuilder,
    public _employeeRecurrentPaymentService: EmployeeRecurrentPaymentService,
    public _conceptService: ConceptService,
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
        this.getEmployeesRecurrentPayment( params[ 'id' ]);
        this.getRecurrentPayment( params[ 'id' ]);
    }); 

    this.company = this._usuarioService.empresas;
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    console.log('empresa1', this.empresaseleccionada)

    if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
      console.log('empresa2', this.empresa)
      
    } else {
      if(this.company.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
        console.log('empresa3', this.empresa)
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
        console.log('empresa4', this.empresa)
      }
    }

    
     this.crearFormulario();

    

  }

   

  ngOnInit(): void {
    
    this.getAllConcept( this.empresa.id )
    /* this.activatedRoute.params.subscribe( params =>{
        this._modalUploadServices.notificacion
        .subscribe( () =>  this.getEmplo yeesRecurrentPayment( params[ 'id' ]));
      }); */

      this.getConcept(this.empresa.id)
  
      this.pageScrollServ.scroll({
        document: this.document,
        scrollTarget: '.theEnd',
      });

  }

  get conceptNoValido(){return this.forma.get('concept')!.invalid && this.forma.get('concept')!.touched}
  get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}
  get valueNoValido(){return this.forma.get('value')!.invalid && this.forma.get('value')!.touched}
   

  crearFormulario(){
    this.forma = this.fb.group({
       concept     : ['', Validators.required],
       value     : ['', Validators.required],
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

  getEmployeesRecurrentPayment( id: string ) {
    this._employeeRecurrentPaymentService.getEmployeeRecurrentPayment( id )
        .subscribe( employeeRecurrentPayment => {

        this.employeeRecurrentPayments = employeeRecurrentPayment;
        
        });

  }

  getRecurrentPayment( id: string ) {
    this._employeeRecurrentPaymentService.cargarEmployeeRecurrentPayment( id )
        .subscribe( recurrentPayment => {

        this.recurrentPayments = recurrentPayment;
        
        });

  }

  

  getConcept( id:string)  {
    this._conceptService.cargarConceptCompany(id)
        .subscribe( concepts => {
          this.concepts = concepts;
          console.log('conce', this.concepts)
  });
  }

  getAllConcept( id:string)  {
    this._conceptService.getAllConceptNovelty( id )
        .subscribe( concepts => {
          
          this.concepto = concepts;
          console.log('conce', this.concepto)
  });
  }
  
  
  hideDialog() {
    this.recurrentPaymentDialog = false;
    this.submitted = false;
    this.forma.reset();
}

openNewEmployeeRecurrentPayment() {
    this.employeeRecurrentPay! = {};
    this.recurrentPayments.isActive="true";
    this.submitted = false;
    this.recurrentPaymentDialog = true;
    this.new= true;
}


editEmployeeRecurrentPayment(recurrentPayment: EmployeeRecurrentPayment) {
    this.recurrentPayments = {...recurrentPayment};
    this.recurrentPaymentDialog = true;
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
          console.log('entroalactualizar')
            this._employeeRecurrentPaymentService.actualizarEmployeeRecurrentPayment( this.recurrentPayments)
            .subscribe( () => this.getEmployeesRecurrentPayment(id));
          this.new = false;
          this.recurrentPaymentDialog = false;
         
        } else {

 

  
    const employeeRecurrentPayment = new EmployeeRecurrentPayment(
      
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
      id,
      this.forma.value.concept,
      this.forma.value.value,

  );

    this._employeeRecurrentPaymentService.crearEmployeeRecurrentPayment( employeeRecurrentPayment )
  .subscribe( () => this.getEmployeesRecurrentPayment(id));

  this.new = false;
  this.recurrentPaymentDialog = false;
    
    /* this.activatedRoute.params.subscribe( params =>{ */
        /* this._modalUploadServices.notificacion */
         
   /*    }); */
    


    this.forma.reset();
     this.crearFormulario();

  }
    
});
}


  deleteEmployeeRecurrentPayment(employeeRecurrentPayment: EmployeeRecurrentPayment) {
    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar el recurrente' + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"Si",
        rejectLabel:"No",
        accept: () => {
            
            

            this._employeeRecurrentPaymentService.borrarEmployeeRecurrentPayment( employeeRecurrentPayment.id! )
          
            .subscribe( resp => {
                this.recurrentPaymentDialog= false;
                
                this.activatedRoute.params.subscribe( params =>{
                    this._modalUploadServices.notificacion
                    .subscribe( () =>  this.getEmployeesRecurrentPayment( params[ 'id' ]));
                  });
                
              });
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
        }
    });
} 


}