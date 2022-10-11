import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { CompanyService, CountryService, StateService, CityService, SocialSecurityEntityService } from '../../services/companyService.index';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Company } from '../../models/company.model';
import { Country } from '../../models/country.model';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
declare var $:any;
declare var jQuery:any;
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';






@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class CompaniesComponent implements OnInit {
  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  uploadedFiles: any[] = [];
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
 
  




  constructor(
    public _usuarioService: AuthService,
     public _companyService: CompanyService,
     
     public _countryService: CountryService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _socialSecurityEntityService: SocialSecurityEntityService,
     
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

    this.cargarCompanyInfo( this.empresa.id );
    this.cargarCompanySelect( this.empresa.id );

  }

  ngOnInit(): void {
    
    this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
    
    this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id));
    
  this.pageScrollServ.scroll({
    document: this.document,
    scrollTarget: '.theEnd',
  });


  }

  onSelectEvent(event: HTMLElement) {
    console.log("Selected files", event);
  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

   onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 310,
      document: this.document
    });

    this.active = i;
  } 

  /* onUpload(event: any) {
    for(let file of event.files) {
       this.uploadImage(file,this.empresa.id )
    }
  }
 */

  

  cargarCompanyInfo( id: string ) {
    //this._companyInfoService.cargarCompanyInfo( id )
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
          
           if (this.company.country_id) {this.obtenerCountry( this.company.country_id )};
          if (this.company.state_id) {this.obtenerState(this.company.state_id)};
          if (this.company.city_id) {this.obtenerCity(this.company.city_id)};
          if (this.company.compensationFund_id) {this.obtenerCajasCompensacion(this.company.compensationFund_id)};
          if (this.company.entityRisks_id) {this.obtenerEntidadRiesgos(this.company.entityRisks_id)}; 
          
        });

  }

 

  actualizarImagen( company: Company){
  
    console.log('entroaca')
    this._modalUploadService.mostrarModal('companys', company.id);
    this._modalUploadService.oculto
    console.log( 'oculto',this._modalUploadService.oculto)
    
    
  }

 

  obtenerCountry( id: string)  {
    this._countryService.obtenerPaises( id )
        .subscribe( country => {
          this.country = country;
          
  });
}

obtenerState( id: string)  {
  this._stateService.obtenerDepartamento( id )
      .subscribe( state => {
        this.state = state;
});
}

obtenerCity( id: string)  {
  this._cityService.obtenerMunicipio( id )
      .subscribe( city => {
        this.city = city;
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

}
