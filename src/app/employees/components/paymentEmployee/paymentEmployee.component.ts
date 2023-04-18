import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { EmployeePaymentService } from '../../services/employeeService.index';
import { BankService } from '../../../companies/services/bank/bank.service';
import { AccounttypeService } from '../../../companies/services/AccountType/accounttype.service';
import { EmployeePayment } from '../../models/employeesPayment.model';
import { Bank } from '../../../companies/models/bank.model';
import { AccountType } from '../../../companies/models/accountType.model';

import { AuthService } from '../../../auth/services/authservice.index';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-paymentEmployee',
  templateUrl: './paymentEmployee.component.html',
  styleUrls: ['./paymentEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PaymentEmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  forma!: UntypedFormGroup;
  public date: Date = new Date();
  isActive = true;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  bank: any = {};
  banks: Bank[]=[];
  accountType: any = {};
  accountTypes: AccountType[]= [];
  empresaseleccionada: any = {};
  public company: any = {};
  public employeePay: any = {};
  empresa: any = {};
  usuario: any = {};
  version = 'Angular: v' + VERSION.full;
  registro: any = {};
  submitted!: boolean;
  new!: boolean;
  paymentEmployeeDialog!: boolean;
  employeesPayments: any= {};
  employeeId: string = ''


  employeePayment: EmployeePayment = new EmployeePayment('', '', true, '', '',  0, '', this.date, this.date);


  constructor(
              private fb: UntypedFormBuilder,
              public _router: Router,
              public _usuarioService: AuthService,
              public activatedRoute: ActivatedRoute,
              public _employeepaymentService: EmployeePaymentService,
              public _bankService: BankService,
              public _accountTypeService: AccounttypeService,
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
  this._modalUploadServices.notificacion
      this.cargarEmployeesPayment( params[ 'id' ]);
 });

              this.crearFormulario();

              }

  ngOnInit(): void {



    this.getAllAccountType();
    this.getAllBank();

   /*  this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion

      .subscribe( () =>  this.cargarEmployeesPayment( params[ 'id' ]));
    }); */

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });



  }

  get bankNoValido(){return this.forma.get('bank')!.invalid && this.forma.get('bank')!.touched}
  get accountTypeNoValido(){return this.forma.get('accountType')!.invalid && this.forma.get('accountType')!.touched}
  get accountNumberNoValido(){return this.forma.get('accountNumber')!.invalid && this.forma.get('accountNumber')!.touched}


  crearFormulario(){
    this.forma = this.fb.group({
      bank           : ['', Validators.required],
      accountType       : ['', Validators.required],
      accountNumber    : ['', Validators.required],
    });

  }

  guardar(paymentEmployee: EmployeePayment){

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
      const id = params[ 'id' ];


    let form = [
      {

        updateUser: this.usuario,
            isActive: this.isActive,
            bank_id: this.forma.value.bank,
            accountType_id: this.forma.value.accountType,
            id:id,
            accountNumber: this.forma.value.accountNumber


      }
    ]


    this.registro =  JSON.parse(JSON.stringify(form[0]));


    this._employeepaymentService.actualizarEmployeePayment( this.employeesPayments)
            .subscribe( () => this.cargarEmployeesPayment(this.employeePay.id));
            this.paymentEmployeeDialog = false;



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
    this.paymentEmployeeDialog = false;
    this.submitted = false;
}

editPaymentEmployee(paymentEmployee: EmployeePayment) {
  this.employeesPayments = {...paymentEmployee};
  this.paymentEmployeeDialog = true;
  this.new= false;
}

  cargarEmployeesPayment( id: string ) {
    this._employeepaymentService.cargarEmployeePayment( id )
        .subscribe( employeePayment => {
        this.employeePay = employeePayment[0];

        if(this.employeePay){
          this.getBank( this.employeePay.bank_id );
          this.getAccountType( this.employeePay.accountType_id );
        }

        });

  }

  getBank( id: string)  {
    this._bankService.obtenerBanco( id )
        .subscribe( bank => {
          this.bank = bank;
  });
  }

  getAllBank()  {
    this._bankService.cargarBancos()
        .subscribe( bank => {
          this.banks = bank;
  });
  }

  getAccountType( id: string)  {
    this._accountTypeService.obtenerTipoCuenta( id )
        .subscribe( accountType => {
          this.accountType = accountType;
  });
  }

  getAllAccountType()  {
    this._accountTypeService.cargarTipoCuentas()
        .subscribe( accountType => {
          this.accountTypes = accountType;
  });
  }

}
