import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { ConceptService, CompanyService } from '../../services/companyService.index';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';
import { Country } from '../../models/country.model';
import { SpendingAccount } from '../../models/spendingAccount.model';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
//import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Concept } from '../../models/concept.model';


@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {

  empresaseleccionada: any = {};
  empresa: any = {};
  public company: any = {};
  usuario: any = {};
  conceptSalary: Concept[] = [];
  conceptNoSalary: Concept[] = [];
  conceptDeduction: Concept[] = [];
  conceptSocialBenefit: Concept[] = [];
  conceptCustomer: Concept[] = [];
  active = 1;
  consecutiveConcept!: number
  isActive = true;
  notActive = false;
  conceptDialog!: boolean;
  submitted!: boolean;
  new!: boolean;
  forma!: FormGroup;
  concept: any= {};
  cGroup: string = ""
  user!: string;
    companyUser: any = {};

  constructor(
    private fb: FormBuilder,
    public _conceptService: ConceptService,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _router: Router,
     public activatedRoute: ActivatedRoute,
     private messageService: MessageService,
     //public pageScrollServ: PageScrollService,
     private confirmationService: ConfirmationService,
     @Inject(DOCUMENT) private document: any
  ) {

    //this.company = this._usuarioService.empresas;
    //this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
    this.user = localStorage.getItem('id')!;
    this.cargarEmpresasUsuario(this.user)
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);


    /* if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);


    } else {
      if(this.company.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
      }
    } */




  }



  get codeNoValido(){return this.forma.get('code')!.invalid && this.forma.get('code')!.touched}
  get descripcionNoValido(){return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched}
  get accountNoValido(){return this.forma.get('account')!.invalid && this.forma.get('account')!.touched}
  get counterPartNoValido(){return this.forma.get('counterPart')!.invalid && this.forma.get('counterPart')!.touched}
  get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}


  crearFormulario(){
    this.forma = this.fb.group({
      code     : ['', Validators.required],
      descripcion: ['', Validators.required],
      account: ['', Validators.required],
      counterPart: ['', Validators.required],
      estado    : ['true']
      });

  }

  ngOnInit(): void {
    this.user = localStorage.getItem('id')!;
    this.cargarEmpresasUsuario(this.user)
    this.crearFormulario();

    var x = Math.floor(Math.random()*100);

    //this.crearFormulario();

   /*  this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    }); */
  }

 /*  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 100,
      document: this.document
    });

    this.active = i;
  }
 */


  openNewConcept(conceptGroup: string) {
    this.cGroup = conceptGroup

    this.getConceptCustomer(this.empresa.id)



}

editConcept(concept: Concept, conceptGroup: string) {
  this.cGroup = conceptGroup
  this.concept = {...concept};
  this.conceptDialog = true;
  this.new= false;
}

  getConceptSalary( id: string ) {
    this._conceptService.getConceptSalaryCompany( id )
        .subscribe( conceptSalary => {
          this.conceptSalary = Array.isArray(conceptSalary.data) ? conceptSalary.data : [conceptSalary.data]

        });

  }

  getConceptNoSalary( id: string ) {
    this._conceptService.getConceptNoSalaryCompany( id )
        .subscribe( conceptNoSalary => {
          this.conceptNoSalary = Array.isArray(conceptNoSalary.data) ? conceptNoSalary.data : [conceptNoSalary.data]

        });

  }

  getConceptDeduction( id: string ) {
    this._conceptService.getConceptDeductionCompany( id )
        .subscribe( conceptDeduction => {
          this.conceptDeduction = Array.isArray(conceptDeduction.data) ? conceptDeduction.data : [conceptDeduction.data]

        });

  }

  getConceptSocialBenefit( id: string ) {
    this._conceptService.getConceptSocialBenefitCompany( id )
        .subscribe( conceptSocialBenefit => {
          this.conceptSocialBenefit = Array.isArray(conceptSocialBenefit.data) ? conceptSocialBenefit.data : [conceptSocialBenefit.data];

        });

  }

  getConceptCustomer( id: string ) {
    this._conceptService.getConceptCustomerCompany( id )
        .subscribe( conceptCustomer => {
          this.conceptCustomer = conceptCustomer;
          this.consecutiveConcept = this.conceptCustomer.length + 1

          this.concept! = {};

if(this.cGroup == 'SALARIAL' || this.cGroup == 'NOSALARIAL'){
  if (this.consecutiveConcept < 10){
    this.concept.code="1M0" + this.consecutiveConcept;
  } else{
    this.concept.code="1M" + this.consecutiveConcept;
  }
}else{
  if (this.consecutiveConcept < 10){
    this.concept.code="2T0" + this.consecutiveConcept;
  } else{
    this.concept.code="2T" + this.consecutiveConcept;
  }
}


          this.concept.isActive= true;
          this.submitted = false;
          this.conceptDialog = true;
          this.new= true;

        });

  }



hideDialog() {
  this.conceptDialog = false;
  this.submitted = false;
}






guardar(){

  if (this.forma.invalid){



    return Object.values (this.forma.controls).forEach( control =>{

      if (control instanceof FormGroup) {
        Object.values (control.controls).forEach( control => control.markAsTouched());

      } else{
        control.markAsTouched();
      }


    });
  }

  this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if ( this.new !== true) {
          this._conceptService.actualizarConcept( this.concept )
        .subscribe( res =>{
          if( this.cGroup == 'SALARIAL'){
            this.getConceptSalary( this.empresa.id );
          }if(( this.cGroup == 'NOSALARIAL')){
            this.getConceptNoSalary( this.empresa.id );
          }else{
            this.getConceptDeduction( this.empresa.id );
          }
        });

        this.new = false;
        this.conceptDialog = false;

      } else {

  this.getConceptCustomer(this.empresa.id)

  const concept = new Concept(
    this.forma.value.code,
    this.forma.value.descripcion,
    this.empresa.id,
    this.forma.value.account,
    this.forma.value.counterPart,
    this.cGroup,
    this.usuario.id,
    this.usuario.id,
    this.forma.value.estado,
    true,
    true,
    true,
    true,
    true,
    this.notActive,
    true,
    this.isActive,
    this.notActive,
    "null",
    true,
    this.isActive
);
console.log('conceptsave', concept)
  this._conceptService.createConcept( concept )
.subscribe( resp => {
  this.conceptDialog = false;

  if( this.cGroup == 'SALARIAL'){
    this.getConceptSalary( this.empresa.id );
  }if(( this.cGroup == 'NOSALARIAL')){
    this.getConceptNoSalary( this.empresa.id );
  }else{
    this.getConceptDeduction( this.empresa.id );
  }


});

  this.forma.reset();
  this.crearFormulario();

}

});
}

cargarEmpresasUsuario(iduser: any) {
  this._companyService.cargarCompanysUser(iduser).subscribe(
    (resp: any) => {
      if (resp && resp.companies) {

        this.companyUser = resp.companies;

        this.usuario = resp.user;

        if(this.companyUser.length > 1 ){
          this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
          this.getConceptSalary(this.empresa.id)
          this.getConceptNoSalary(this.empresa.id)
          this.getConceptDeduction(this.empresa.id)
          this.getConceptSocialBenefit(this.empresa.id)

        }else{
          this.empresa =  this.companyUser[0];
          this.getConceptSalary(this.empresa.id)
          this.getConceptNoSalary(this.empresa.id)
          this.getConceptDeduction(this.empresa.id)
          this.getConceptSocialBenefit(this.empresa.id)


        }

      } else {
        this.companyUser = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
      }

      this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
    },
    (error) => {
      console.error('Error al cargar las empresas:', error);
      this.companyUser  = { companies: [] }; // En caso de error, aseguramos que no falle
    }
  );
}


}
