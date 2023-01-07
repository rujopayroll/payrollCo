
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Concept } from '../../../companies/models/concept.model';
import { Company } from '../../../companies/models/company.model';
import { CompanyPayment } from '../../../companies/models/companyPayment.model';
import { CompanyPayroll } from '../../../companies/models/companyPayroll.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/authservice.index';
import { ConceptService } from '../../../companies/services/companyService.index';
import { CompanyService } from '../../../companies/services/companyService.index';
import { CompanyPaymentService } from '../../../companies/services/companyService.index';
import { CompanyPayrollService } from '../../../companies/services/companyService.index';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  forma!: FormGroup;
  starDemoDay: Date = new Date();
  demoDay = 30;
  createUser: any;
  updateUser: any;
  idUser: any;
  idCompany: any;
  registro: any = {};
  concept: Concept[] = [];
  isActive = true;

  //formaRegister: FormGroup;

  formaRegister!: FormGroup;
  
  

  constructor( public _usuarioService: AuthService,
    public _conceptService: ConceptService,
    public _companyService: CompanyService,
    public _companyPaymentService: CompanyPaymentService,
    public _companyPayrollService: CompanyPayrollService,
    public _router: Router,
    private fb: FormBuilder ) {

    this.cargarConcept();
    this.crearFormulario()
    }

    ngOnInit(): void {
    
    }

    get nombreNoValido(){return this.formaRegister.get('name')!.invalid && this.formaRegister.get('name')!.touched }
    get empresaNoValido(){return this.formaRegister.get('company')!.invalid && this.formaRegister.get('company')!.touched }
    get correoNoValido(){return this.formaRegister.get('email')!.invalid && this.formaRegister.get('email')!.touched }
    get telefonoNoValido(){return this.formaRegister.get('cellPhone')!.invalid && this.formaRegister.get('cellPhone')!.touched }
    get passwordNoValido(){return this.formaRegister.get('password')!.invalid && this.formaRegister.get('password')!.touched }
    
  
    crearFormulario(){

     this.formaRegister = this.fb.group({
      name       : ['', [Validators.required]],
      company      : ['', [Validators.required]],
      email       : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      cellPhone     : ['', [Validators.required]],
      password   : ['', Validators.required],
      condiciones  : ['']
    }); 
    }
 

 

  registrarUsuario() {
    
    if (this.formaRegister.invalid){

      return Object.values (this.formaRegister.controls).forEach( control =>{
  
        if (control instanceof UntypedFormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
      });
    }

    if ( !this.formaRegister.value.condiciones){
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        icon: 'warning'
      });
      return;
    }



    const form = [
      {

        name: this.formaRegister.value.name,
        userName: this.formaRegister.value.email,
        password: this.formaRegister.value.password,
        isActive: this.isActive,
        cellPhone: this.formaRegister.value.cellPhone,
        companyName: this.formaRegister.value.company
        
      }
    ]

    this.registro =  JSON.parse(JSON.stringify(form[0]));
    this._usuarioService.crearUsuario( this.registro )
    
          .subscribe( respu => {
           
            this._router.navigate(['/auth/login']);

            /*  const company = new Company(
                  this.formaRegister.value.company,
                  this.formaRegister.value.email,
                  this.createUser = respu.id,
                  this.updateUser = respu.id,
                  this.idUser = respu.id,
                  this.isActive,
                  
                  
                  
              );
              console.log('register', company)
              this._companyService.crearCompany( company )
                .subscribe( respc1 => { 
                  console.log('company register', company) */


            /* const companyPayment = new CompanyPayment(
                this.idCompany = respu.company_id,
                this.createUser = respu.id,
                this.updateUser = respu.id,
                this.isActive,
                
              );
            console.log('companypayment', companyPayment)
            const companyPayroll = new CompanyPayroll(
                this.idCompany = respu.company_id,
                this.createUser = respu.id,
                this.updateUser = respu.id,
                this.isActive,
                
              );
          

              this._companyPaymentService.crearCompanyPayment( companyPayment )
              .subscribe( respcp => {
              });


            this._companyPayrollService.crearCompanyPayroll( companyPayroll )
                    .subscribe( respcp => {
                    }); */

                    
                    // **aca va el json que guarda los conceptos a cada empresa**

                    /* this._conceptService.crearConceptStandard(respu.company_id)
                    .subscribe( respc => {
                     
                    }); */


                 /*  });  */

                 
          });
  }

  cargarConcept() {
    this._conceptService.cargarConcept()
        .subscribe( concept => {
          this.concept = concept;
        });

  }

  campoEsValido( campo: string){
    return this.formaRegister.controls[campo].errors 
        && this.formaRegister.controls[campo].touched
  }

  este(){
    console.log('boton')
  }

}
