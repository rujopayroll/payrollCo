import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService, CountryService, StateService, CityService, SocialSecurityEntityService,
         CompanyPaymentService, IdentificationTypeService } from '../../services/companyService.index';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';
import { SocialSecurityEntity } from '../../models/socialSecurityEntity.model';
import { City } from '../../models/city.model';
import { IdentificationType } from '../../models/identificationType.model';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';






@Component({
  selector: 'app-infoCompany',
  templateUrl: './infoCompany.component.html',
  styleUrls: ['./infoCompany.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class InfoCompanyComponent implements OnInit {
  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;

  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;
  public date: Date = new Date();
  forma!: UntypedFormGroup;
  public company: any = {};
  companies: any= {};
  //public companyInfo: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  country: any  = {};
  state: any = {};
  city: any = {};
  caja: any = {};
  riesgo: any = {};
  selectedInfoCompany: any = [];
  infoCompanyDialog!: boolean;
  submitted!: boolean;
  new!: boolean;
  registro: any = {};
  usuario: any = {};
  tiposd: IdentificationType[] = [];
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  municipios: any = {};
  socialss: SocialSecurityEntity[] = [];
  cajas: SocialSecurityEntity[] = [];
  riesgos: SocialSecurityEntity[] = [];

  companyInfo: Company = new Company('', '', '', '','', true, '', '', '', '','', '', this.date, '', '', '', this.date, this.date, '', '', '', '','');



  constructor(
    private fb: UntypedFormBuilder,
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     public _companyPaymentService: CompanyPaymentService,
     public _countryService: CountryService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _identificationTypeService: IdentificationTypeService,
     
     public _socialSecurityEntityService: SocialSecurityEntityService,
     public _router: Router,
     public _activatedRoute: ActivatedRoute,
     public _modalUploadService: ModalUploadService,
     public _subirArchivoService: SubirArchivoService,
     public pageScrollServ: PageScrollService,
     private messageService: MessageService, 
     private confirmationService: ConfirmationService,
     
     @Inject(DOCUMENT) private document: any
     /* public _countryService: CountryService,
     public _usuarioService: UsuarioService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _socialSecurityEntityService: SocialSecurityEntityService,
     public _companyPaymentService: CompanyPaymentService,
     public _paymentFrequencyService: PaymentFrequencyService,
     public _paymentMethodService: PaymentMethodService,
     public _bankService: BankService,
     public _accounttypeService: AccounttypeService */
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

    this.cargarCompanyInfo( this.empresa.id );
    
    this.crearFormulario();
    
    


  }

  get nameNoValido(){return this.forma.get('name')!.invalid && this.forma.get('name')!.touched}
  get tidentificacionNoValido(){return this.forma.get('tidentificacion')!.invalid && this.forma.get('tidentificacion')!.touched}
  get nitNoValido(){return this.forma.get('nit')!.invalid && this.forma.get('nit')!.touched}
  get digitovNoValido(){return this.forma.get('digitov')!.invalid && this.forma.get('digitov')!.touched}
  get paisNoValido(){return this.forma.get('pais')!.invalid && this.forma.get('pais')!.touched}
  get deptoNoValido(){return this.forma.get('depto')!.invalid && this.forma.get('depto')!.touched}
  get ciudadNoValido(){return this.forma.get('ciudad')!.invalid && this.forma.get('ciudad')!.touched}
  get direccionNoValido(){return this.forma.get('direccion')!.invalid && this.forma.get('direccion')!.touched}
  get telefonoNoValido(){return this.forma.get('telefono')!.invalid && this.forma.get('telefono')!.touched}
  get celularNoValido(){return this.forma.get('celular')!.invalid && this.forma.get('celular')!.touched}
  get correoNoValido(){return this.forma.get('email')!.invalid && this.forma.get('email')!.touched}
  get rlegalNoValido(){return this.forma.get('rlegal')!.invalid && this.forma.get('rlegal')!.touched}
  get ffundacionNoValido(){return this.forma.get('ffundacion')!.invalid && this.forma.get('ffundacion')!.touched}
  get riesgoeNoValido(){return this.forma.get('riesgoe')!.invalid && this.forma.get('riesgoe')!.touched}
  get cajaNoValido(){return this.forma.get('caja')!.invalid && this.forma.get('caja')!.touched} 


  ngOnInit(): void {

    this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
    
    this.cargarTiposd();
    this.getAllCountry();
    this.getAllState();
    this.getAllCity();
    this.cargarCompanyInfo( this.empresa.id );
    this.cargarEntidadesRiegos();
    this.cargarCajasCompensacion();


  this.pageScrollServ.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });


  }

  crearFormulario(){
    this.forma = this.fb.group({
      name           :['',Validators.required],
      tidentificacion  :['',Validators.required],
      nit             :['',Validators.required],
      digitov        :['',Validators.required],
      pais           :['',Validators.required],
      depto          :['',Validators.required],
      ciudad         :['',Validators.required],
      direccion   :['',Validators.required],
      telefono    :[''],
      celular     :[''],
      email       :['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      rlegal      :[''],
      ffundacion  :[''],
      riesgoe     :['',Validators.required],
      caja        :['',Validators.required] 

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

  
  guardar(company: Company){

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
        name: this.forma.value.name,
        updateUser: this.usuario.id,
        identification: this.forma.value.nit,
        verificationNumber: this.forma.value.digitov,
        city_id: this.forma.value.ciudad,
        address: this.forma.value.direccion,
        phone: this.forma.value.telefono,
        cellphone: this.forma.value.celular,
        email: this.forma.value.email,
        legalRepresentant: this.forma.value.rlegal,
        fundationDate: this.forma.value.ffundacion,
        entityRisks_id: this.forma.value.riesgoe,
        compensationFund_id: this.forma.value.caja,
        state_id: this.forma.value.depto,
        country_id: this.forma.value.pais,
        identificationType_id: this.forma.value.tidentificacion,
       

      }
    ]
  
    this.registro =  JSON.parse(JSON.stringify(form[0]));
    

    this._companyService.actualizarCompany( this.registro )
            .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
            this.infoCompanyDialog = false;
    
    
  
    // this.forma.reset();
  
  }





  hideDialog() {
    this.infoCompanyDialog = false;
    this.submitted = false;
}




editInfoCompany(company: Company) {
    this.companies = {...company};
    this.infoCompanyDialog = true;
    this.new= false;
}
  

cargarTiposd() {
    this._identificationTypeService.cargarTiposDocumentos()
    .subscribe( resp => this.tiposd = resp);
    console.log(this.tiposd);
  }


  cargarCompanyInfo( id: string ) {
    
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
          
           if (this.company.country_id) {this.obtenerCountry( this.company.country_id )};
          if (this.company.state_id) {this.obtenerState(this.company.state_id)};
          if (this.company.city_id) {this.obtenerCity(this.company.city_id)};
          if (this.company.city_id) {this.cargarMunicipiosDeptos(this.company.state_id)};
          if (this.company.compensationFund_id) {this.obtenerCajasCompensacion(this.company.compensationFund_id)};
          if (this.company.entityRisks_id) {this.obtenerEntidadRiesgos(this.company.entityRisks_id)}; 
          
        });

  }

  

  actualizarImagen( company: Company){
  
    this._modalUploadService.mostrarModal('companys', company.id! );
    
    
  }

  obtenerCountry( id: string)  {
    this._countryService.obtenerPaises( id )
        .subscribe( country => {
          this.country = country;
          
  });
}

getAllCountry()  {
    this._countryService.cargarPaises()
        .subscribe( countries => {
          this.countries = countries;
          console.log(this.countries)
          
  });
}



obtenerState( id: string)  {
  this._stateService.obtenerDepartamento( id )
      .subscribe( state => {
        this.state = state;
});
}


getAllState()  {
    this._stateService.cargarDepartamentos( )
        .subscribe( states => {
          this.states = states;
  });
  }

obtenerCity( id: string)  {
  this._cityService.obtenerMunicipio( id )
      .subscribe( city => {
        this.city = city;
});
}

getAllCity()  {
    this._cityService.cargarMunicipios( )
        .subscribe( cities => {
          this.cities = cities;
  });
  }

obtenerCajasCompensacion(id : string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntity => {
        this.caja = socialSecurityEntity;
});
} 

obtenerEntidadRiesgos(id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS(id)
      .subscribe( socialSecurityEntity => {
        this.riesgo = socialSecurityEntity;
      
});
}

cargarMunicipiosDeptos(id: string) {
    this._cityService.obtenerMunicipioDepto(id)
    .subscribe( resp => this.municipios = resp);
  }

onSelect(id: string): void {
    this.cargarMunicipiosDeptos(id);
  }

  cargarCajasCompensacion() {
    this._socialSecurityEntityService.obtenerEntidadSSPorTipo('CCF')
    .subscribe( resp => this.cajas = resp);
    
  } 

  cargarEntidadesRiegos() {
    this._socialSecurityEntityService.obtenerEntidadSSPorTipo('ARL')
    .subscribe( resp => this.riesgos = resp);
 
  }




}