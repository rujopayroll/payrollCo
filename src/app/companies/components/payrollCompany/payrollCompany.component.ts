import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService, CountryService, StateService, CityService, SocialSecurityEntityService,
         PaymentFrequencyService, CompanyPayrollService, PaymentMethodService, BankService, AssistancetypeService,
         CostCenterService, SpendingAccountService } from '../../services/companyService.index';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';

import { ModalUploadService } from '../modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CompanyPayroll } from '../../models/companyPayroll.model';
import { AssistanceType } from '../../models/assistanceType.model';






@Component({
  selector: 'app-payrollCompany',
  templateUrl: './payrollCompany.component.html',
  styleUrls: ['./payrollCompany.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PayrollCompanyComponent implements OnInit {
  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  assistanceTypes: AssistanceType[] = [];
  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;
  public date: Date = new Date();
  forma!: UntypedFormGroup;
  public company: any = {};
  public companyInfo: any = {};
  companyPayrolls: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  usuario: any = {};
  assistanceType: any = {};
  registro: any = {};
  selectedPayrollCompany: any = [];
  payrollCompanyDialog!: boolean;
  submitted!: boolean;
  new!: boolean;

  companyPayroll: CompanyPayroll = new CompanyPayroll('', '', '', true, true, true, true, '', this.date, this.date);
  
  




  constructor(
    private fb: UntypedFormBuilder,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _companyPayrollService: CompanyPayrollService,
     public _assistancetypeService: AssistancetypeService,
     public _router: Router,
     public _activatedRoute: ActivatedRoute,
     public _modalUploadService: ModalUploadService,
     public _subirArchivoService: SubirArchivoService,
     public pageScrollServ: PageScrollService,
     private messageService: MessageService, 
     private confirmationService: ConfirmationService,
     
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
    this.cargarCompanyPayroll(this.empresa.id);
    this.crearFormulario();


  }

  get law1393NoValido(){return this.forma.get('law1393')!.invalid && this.forma.get('law1393')!.touched}
  get exoneratedCREENoValido(){return this.forma.get('exoneratedCREE')!.invalid && this.forma.get('exoneratedCREE')!.touched}
  get affectAbsenteeLBNoValido(){return this.forma.get('affectAbsenteeLB')!.invalid && this.forma.get('affectAbsenteeLB')!.touched}
  get payday31vacationNoValido(){return this.forma.get('payday31vacation')!.invalid && this.forma.get('payday31vacation')!.touched}
  get assistanceTypeNoValido(){return this.forma.get('assistanceType')!.invalid && this.forma.get('assistanceType')!.touched}
  


  ngOnInit(): void {
    
    this.gelAllAssistanceType();

 


  this.pageScrollServ.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });


  }

  crearFormulario(){
    this.forma = this.fb.group({
        law1393   :['',Validators.required],
        exoneratedCREE  :['',Validators.required],
        affectAbsenteeLB :['',Validators.required],
        payday31vacation: ['',Validators.required],
        assistanceType     :['',Validators.required],
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
    this.payrollCompanyDialog = false;
    this.submitted = false;
}




editPayrollCompany(companyPayroll: CompanyPayroll) {
    this.companyPayrolls = {...companyPayroll};
    this.payrollCompanyDialog = true;
    this.new= false;
}


  guardar(companyPayroll: CompanyPayroll){

    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof UntypedFormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }
  


  let form = [
    {

      id: this.empresa.id,
      updateUser: this.usuario.id,
      law1393: this.forma.value.law1393,
      exoneratedCREE : this.forma.value.exoneratedCREE ,
      affectAbsenteeLB: this.forma.value.affectAbsenteeLB,
      payday31vacation:this.forma.value.payday31vacation,
      assistanceType : this.forma.value.assistanceType 

    }
  ]

  this.registro =  JSON.parse(JSON.stringify(form[0]));

console.log(this.registro)
    this._companyPayrollService.actualizarCompanyPayroll( this.registro )
            .subscribe( () => this.cargarCompanyPayroll(this.empresa.id));
            this.payrollCompanyDialog = false;
    
  
    // this.forma.reset();
  
  }


  

  

  cargarCompanyPayroll( id: string ) {
    this._companyPayrollService.cargarCompanyPayroll( id )
        .subscribe( company => {
          this.companyPayroll = company;
         console.log('payroll', this.companyPayroll)
         
          this.obtenerAssistanceType(this.companyPayroll.assistanceType!);
          
        });

  }

  actualizarImagen( company: Company){
  
    this._modalUploadService.mostrarModal('companys', company.id! );
    
    
  }




obtenerAssistanceType( id: string ) {
  this._assistancetypeService.obtenerTipoAuxilio( id )
  .subscribe( resp => this.assistanceType = resp);

}

gelAllAssistanceType() {
    this._assistancetypeService.cargarTipoAuxilio()
    .subscribe( resp => this.assistanceTypes = resp);
  
  }




}