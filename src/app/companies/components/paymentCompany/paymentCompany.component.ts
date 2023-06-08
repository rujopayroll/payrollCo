import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService, CountryService, StateService, CityService, SocialSecurityEntityService,
         PaymentFrequencyService, CompanyPaymentService, PaymentMethodService, BankService, AccounttypeService,
         CostCenterService, SpendingAccountService } from '../../services/companyService.index';

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
import { CompanyPayment } from '../../models/companyPayment.model';
import { PaymentFrequency } from '../../models/paymentFrequency.model';
import { PaymentMethod } from '../../models/paymentMethod.model';
import { Bank } from '../../models/bank.model';
import { AccountType } from '../../models/accountType.model';






@Component({
  selector: 'app-paymentCompany',
  templateUrl: './paymentCompany.component.html',
  styleUrls: ['./paymentCompany.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PaymentCompanyComponent implements OnInit {
  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  paymentFrequencys: PaymentFrequency[] = [];
  paymentMethods: PaymentMethod[] = [];
  banks: Bank[] = [];
  accountTypes: AccountType[] = [];
  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;
  public date: Date = new Date();
  forma!: UntypedFormGroup;
  public company: any = {};
  public companyInfo: any = {};
  companyPayments: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  usuario: any = {};
  paymentFrequency: any = {};
  paymentMethod: any = {};
  bank: any = {};
  accountType: any = {};
  public costCenter: any= {};

  cuentagasto: any= {};
  registro: any = {};
  selectedPaymentCompany: any = [];
  paymentCompanyDialog!: boolean;
  submitted!: boolean;
  new!: boolean;

  companyPayment: CompanyPayment = new CompanyPayment('', '', '', true, 0, '', '', '', '', this.date, this.date);






  constructor(
    private fb: UntypedFormBuilder,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _companyPaymentService: CompanyPaymentService,
     public _paymentFrequencyService: PaymentFrequencyService,
     public _paymentMethodService: PaymentMethodService,
     public _bankService: BankService,
     public _accounttypeService: AccounttypeService,
     public _costCenterService: CostCenterService,
     public _spendingAccountService: SpendingAccountService,
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
    this.cargarCompanyPayment(this.empresa.id);
    this.crearFormulario();


  }

  get frecuenciapagoNoValido(){return this.forma.get('frecuenciapago')!.invalid && this.forma.get('frecuenciapago')!.touched}
  get metodopagoNoValido(){return this.forma.get('metodopago')!.invalid && this.forma.get('metodopago')!.touched}
  get bancoNoValido(){return this.forma.get('banco')!.invalid && this.forma.get('banco')!.touched}
  get tipocuentaNoValido(){return this.forma.get('tipocuenta')!.invalid && this.forma.get('tipocuenta')!.touched}
  get numerocuentaNoValido(){return this.forma.get('numerocuenta')!.invalid && this.forma.get('numerocuenta')!.touched}



  ngOnInit(): void {
    this.cargarCuentaGasto();
    this.gelAllPaymentFrequency();
    this.gelAllPaymentMetod();
    this.gelAllBank();
    this.gelAllAccountType();




  this.pageScrollServ.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });


  }

  crearFormulario(){
    this.forma = this.fb.group({
      frecuenciapago   :['',Validators.required],
      metodopago       :['',Validators.required],
      banco            :[''],
      tipocuenta       :[''],
      numerocuenta     :[''],
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
    this.paymentCompanyDialog = false;
    this.submitted = false;
}




editPaymentCompany(companyPayment: CompanyPayment) {
    this.companyPayments = {...companyPayment};
    this.paymentCompanyDialog = true;
    this.new= false;
}


  guardar(companyPayment: CompanyPayment){

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
      accountNumber: this.forma.value.numerocuenta,
      paymentFrequency_id: this.forma.value.frecuenciapago,
      paymentMethod_id: this.forma.value.metodopago,
      bank_id:this.forma.value.banco,
      accountType_id: this.forma.value.tipocuenta



    }
  ]

  this.registro =  JSON.parse(JSON.stringify(form[0]));

console.log(this.registro)
    this._companyPaymentService.actualizarCompanyPayment( this.registro )
            .subscribe( () => this.cargarCompanyPayment(this.empresa.id));
            this.paymentCompanyDialog = false;


    // this.forma.reset();

  }






  cargarCompanyPayment( id: string ) {
    this._companyPaymentService.cargarCompanyPayment( id )
        .subscribe( company => {
          this.companyPayment = company;

          if (this.companyPayment.paymentFrequency_id) {this.obtenerPaymentFrequency( this.companyPayment.paymentFrequency_id )};
           if (this.companyPayment.paymentMethod_id) {this.obtenerPaymentMetod( this.companyPayment.paymentMethod_id )};
          if (this.companyPayment.bank_id) {this.obtenerBank( this.companyPayment.bank_id )};
          if (this.companyPayment.accountType_id) {this.obtenerAccountType( this.companyPayment.accountType_id)};

        });

  }

  actualizarImagen( company: Company){

    this._modalUploadService.mostrarModal('companys', company.id! );


  }



obtenerPaymentFrequency( id: string ) {
  this._paymentFrequencyService.obtenerFrecuenciaPago( id )
  .subscribe( resp => this.paymentFrequency = resp);
}

gelAllPaymentFrequency() {
    this._paymentFrequencyService.cargarFrecuenciaPago()
    .subscribe( resp => this.paymentFrequencys = resp);
  }


obtenerPaymentMetod( id: string ) {
  this._paymentMethodService.obtenerMetodoPago( id )
  .subscribe( resp => this.paymentMethod = resp);
}

gelAllPaymentMetod() {
    this._paymentMethodService.cargarMetodoPago()
    .subscribe( resp => this.paymentMethods = resp);
  }




obtenerBank( id: string) {
  this._bankService.obtenerBanco( id )
  .subscribe( resp => this.bank = resp);

}

gelAllBank() {
    this._bankService.cargarBancos()
    .subscribe( resp => this.banks = resp);

  }



obtenerAccountType( id: string ) {
  this._accounttypeService.obtenerTipoCuenta( id )
  .subscribe( resp => this.accountType = resp);

}

gelAllAccountType() {
    this._accounttypeService.cargarTipoCuentas()
    .subscribe( resp => this.accountTypes = resp);

  }



cargarCuentaGasto() {
  this._spendingAccountService.cargarCuentaGastos()
  .subscribe( resp => this.cuentagasto = resp);
}

obtenerCuentaGasto( id: string) {
  this._spendingAccountService.obtenerCuentaGastos( id )
  .subscribe( resp => this.cuentagasto = resp);
  console.log('gasto',this.cuentagasto)
}


}
