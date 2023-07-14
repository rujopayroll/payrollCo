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
import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Concept } from '../../models/concept.model';


@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
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

  constructor(
    private fb: FormBuilder,
    public _conceptService: ConceptService,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _router: Router,
     public activatedRoute: ActivatedRoute,
     private messageService: MessageService,
     public pageScrollServ: PageScrollService,
     private confirmationService: ConfirmationService,
     @Inject(DOCUMENT) private document: any
  ) {

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
    this.crearFormulario();
    this.getConceptSalary(this.empresa.id)
    this.getConceptNoSalary(this.empresa.id)
    this.getConceptDeduction(this.empresa.id)
    this.getConceptSocialBenefit(this.empresa.id)
    var x = Math.floor(Math.random()*100);
      console.log('x', x)
    //this.crearFormulario();

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
  }

  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 100,
      document: this.document
    });

    this.active = i;
  }



  openNewConcept(conceptGroup: string) {
    this.cGroup = conceptGroup
    console.log('grupo', this.cGroup)
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
          this.conceptSalary = conceptSalary;
          console.log('conceptos', this.conceptSalary)
        });

  }

  getConceptNoSalary( id: string ) {
    this._conceptService.getConceptNoSalaryCompany( id )
        .subscribe( conceptNoSalary => {
          this.conceptNoSalary = conceptNoSalary;
          console.log('conceptos', this.conceptSalary)
        });

  }

  getConceptDeduction( id: string ) {
    this._conceptService.getConceptDeductionCompany( id )
        .subscribe( conceptDeduction => {
          this.conceptDeduction = conceptDeduction;
          console.log('conceptos', this.conceptSalary)
        });

  }

  getConceptSocialBenefit( id: string ) {
    this._conceptService.getConceptSocialBenefitCompany( id )
        .subscribe( conceptSocialBenefit => {
          this.conceptSocialBenefit = conceptSocialBenefit;
          console.log('conceptos', this.conceptSalary)
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
    "SI",
    "SI",
    "SI",
    "SI",
    "SI",
    this.notActive,
    "SI",
    this.isActive,
    this.notActive,
    "null",
    "SI",
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



}
