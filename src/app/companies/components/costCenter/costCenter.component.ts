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
//import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CostCenter } from '../../models/costCenter.model';





@Component({
  selector: 'app-costCenter',
  templateUrl: './costCenter.component.html',
  styleUrls: ['./costCenter.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class CostCenterComponent implements OnInit {


    @ViewChild('scroller1') scroller!: ElementRef;
    active = 1;
    items!: MenuItem[];
    activeItem!: MenuItem;
    scrollableItems!: MenuItem[];
    activeItem2!: MenuItem;
    costCenter: Company[] = [];
    imagenSubir!: File;
    imagenTemp!: string | ArrayBuffer;
    public date: Date = new Date();
    forma!: UntypedFormGroup;
    public company: any = {};
    public companyInfo: any = {};
    public companyPayment: any = {};
    empresaseleccionada: any = {};
    empresa: any = {};
    country: any = {};
    state: any = {};
    city: any = {};
    caja: any = {};
    riesgo: any = {};
    paymentFrequency: any = {};
    paymentMethod: any = {};
    banks: any = {};
    accountType: any = {};
    //public costCenter: any= {};
    usuario: any = {};
    cuentagasto: any= [];
    selectedCostCenter: any = [];
    costCenterDialog!: boolean;
    submitted!: boolean;
    costCent: any= {};
    new!: boolean;
    user!: string;
    companyUser: any = {};
    registro: any = {};
    empresa_id: string = '';
    //costCenterNew: CostCenter = new CostCenter('', '', '', '', '', '', true, this.date, this.date, '');


  constructor(private fb: UntypedFormBuilder,
    public _costCenterService: CostCenterService,
    public _spendingAccountService: SpendingAccountService,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _router: Router,
     public activatedRoute: ActivatedRoute,
     private messageService: MessageService,
     private confirmationService: ConfirmationService
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

  get codigoNoValido(){return this.forma.get('codigo')!.invalid && this.forma.get('codigo')!.touched}
    get descripcionNoValido(){return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched}
    get cuentagastoNoValido(){return this.forma.get('cuentagasto')!.invalid && this.forma.get('cuentagasto')!.touched}
    get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}


  ngOnInit(): void {

    this.crearFormulario();
    this.cargarCuentaGasto()

  }


  obtenerCostCenter( id: string ) {
    this._costCenterService.cargarCostCenter( id )
        .subscribe( costCenter => {

          this.costCenter = Array.isArray(costCenter.data) ? costCenter.data : [costCenter.data];

          // if (this.costCenter[i].spendingAccount_id) { this.obtenerCuentaGasto(this.costCenter[i].spendingAccount_id)};

        });

  }

  cargarCuentaGasto() {
    this._spendingAccountService.cargarCuentaGastos()
    .subscribe( resp => this.cuentagasto = resp.data);
  }

  obtenerCuentaGasto( id: string) {
    this._spendingAccountService.obtenerCuentaGastos( id )
    .subscribe( resp => this.cuentagasto = resp.data);

  }

  hideDialog() {
    this.costCenterDialog = false;
    this.submitted = false;
}

openNewCostCenter() {
    this.costCent! = {};
    this.costCent.isActive=true;
    this.submitted = false;
    this.costCenterDialog = true;
    this.new= true;
}



/* editCostCenter(costCent: CostCenter) {
    this.costCent = {...costCent};
    this.costCenterDialog = true;
    this.new= false;
} */

editCostCenter(costCent: CostCenter) {
  this.costCent = {
    id: costCent.id,
    code: costCent.code,
    description: costCent.description,
    spendingAccount_id: costCent.spendingAccount_id,
    company_id: costCent.company_id,
    isActive: costCent.isActive
  };

  this.costCenterDialog = true;
  this.new = false;
}


  crearFormulario(){
    this.forma = this.fb.group({
      codigo     : ['', Validators.required],
      descripcion: ['', Validators.required],
      cuentagasto: ['' , Validators.required],
       estado    : ['true']
      });

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
          console.log('ceco', this.costCent)
            this._costCenterService.actualizarCostCenter( this.costCent )
          .subscribe( () => this.obtenerCostCenter(this.empresa_id));
          this.new = false;
          this.costCenterDialog = false;

        } else {

    /* const centroCosto = new CostCenter(
      this.forma.value.codigo,
      this.forma.value.descripcion,
      this.forma.value.cuentagasto,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  ); */


  let form = [
    {

      code: this.forma.value.codigo,
      company_id: this.empresa.id,
      description: this.forma.value.descripcion,
      isActive: this.forma.value.estado,
      spendingAccount_id: this.forma.value.cuentagasto,




    }
  ]

  this.registro =  JSON.parse(JSON.stringify(form[0]));





    this._costCenterService.crearCostCenter( this.registro )
  .subscribe( resp => {

    this.costCenterDialog = false;

    this.obtenerCostCenter( this.empresa_id );

  });

    this.forma.reset();
    this.crearFormulario();

  }

});
}


  deleteCostCenter(costCenter: CostCenter) {
    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar el centro de costo' + costCenter.description + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"Si",
        rejectLabel:"No",
        accept: () => {



            this._costCenterService.borrarCostCenter( costCenter.id! )
            .subscribe ( () => this.obtenerCostCenter(this.empresa.id));

            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
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
          this.empresa_id=this.empresa.id
          this.obtenerCostCenter(this.empresa_id)

        }else{
          this.empresa =  this.companyUser[0];
          this.empresa_id=this.empresa.id
          this.obtenerCostCenter(this.empresa_id)

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
