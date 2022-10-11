import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { EmployeeService, IdentificationTypeService, GenderService, CountryService, StateService, 
         CityService } from '../../services/employeeService.index';
import { AuthService } from '../../../auth/services/authservice.index';
import { Employee } from '../../models/employee.model';
import { Gender } from '../../models/gender.model';
import { Company } from '../../../companies/models/company.model';
import { Country } from '../../../companies/models/country.model';
import { State } from '../../../companies/models/state.model';
import { City } from '../../../companies/models/city.model';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { IdentificationType } from '../../models/identificationType.model';


@Component({
  selector: 'app-infoEmployee',
  templateUrl: './infoEmployee.component.html',
  styleUrls: ['./infoEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class InfoEmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  forma!: UntypedFormGroup;
  public date: Date = new Date();
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;

  version = 'Angular: v' + VERSION.full;
  empresaseleccionada: any = {};
  public company: any = {};
  empresa: any = {};
  usuario: any = {};
  public employee: any = {};
  employees: any= {};
  identificationType: any = {};
  gender: any = {};
  country: any  = {};
  state: any = {};
  city: any = {};
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  genders: Gender[] = [];
  identificationTypes: IdentificationType [] = [];
  infoEmployeeDialog!: boolean;
  submitted!: boolean;
  infoEmploy: any= {};
  new!: boolean;
  public newEmployee: any = {};
  isActive = true;
  registro: any = {};
  secondName: any;
  secondSurName: any;
  municipios: any = {};
  
  infoEmployee: Employee = new Employee('', '', this.date, '', '', '', '', '', '', true, '', '', '', '', '', '', '', '', '', this.date, this.date, '', '');

  constructor(private fb: UntypedFormBuilder,
              public _router: Router,
              public activatedRoute: ActivatedRoute,
              public _employeeService: EmployeeService,
              public _usuarioService: AuthService,
              public _identificationTypeService: IdentificationTypeService,
              public _genderService: GenderService,
              public _countryService: CountryService,
              public _stateService: StateService,
              public _cityService: CityService,
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
                  this.cargarEmployees( params[ 'id' ]);
              }); 

              this.crearFormulario();
  
              }

              get tipodocNoValido(){return this.forma.get('tipodoc')!.invalid && this.forma.get('tipodoc')!.touched}
              get documentoNoValido(){return this.forma.get('documento')!.invalid && this.forma.get('documento')!.touched}
              get pnombreNoValido(){return this.forma.get('pnombre')!.invalid && this.forma.get('pnombre')!.touched}
              get snombreNoValido(){return this.forma.get('snombre')!.invalid && this.forma.get('snombre')!.touched}
              get papellidoNoValido(){return this.forma.get('papellido')!.invalid && this.forma.get('papellido')!.touched}
              get sapellidoNoValido(){return this.forma.get('sapellido')!.invalid && this.forma.get('sapellido')!.touched}
              get generoNoValido(){return this.forma.get('genero')!.invalid && this.forma.get('genero')!.touched}
              get fnacimientoNoValido(){return this.forma.get('fnacimiento')!.invalid && this.forma.get('fnacimiento')!.touched}
              get paisrNoValido(){return this.forma.get('paisr')!.invalid && this.forma.get('paisr')!.touched}
              get deptorNoValido(){return this.forma.get('deptor')!.invalid && this.forma.get('deptor')!.touched}
              get ciudadrNoValido(){return this.forma.get('ciudadr')!.invalid && this.forma.get('ciudadr')!.touched}
              get direccionNoValido(){return this.forma.get('direccion')!.invalid && this.forma.get('direccion')!.touched}
              get telefonoNoValido(){return this.forma.get('telefono')!.invalid && this.forma.get('telefono')!.touched}
              get celularNoValido(){return this.forma.get('celular')!.invalid && this.forma.get('celular')!.touched}
              get correoNoValido(){return this.forma.get('email')!.invalid && this.forma.get('email')!.touched}

  ngOnInit(): void {

    this.getAllIdentificationType();
    this.getAllCountry();
    this.getAllState();
    this. getAllGender();

    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployees( params[ 'id' ]));
    });

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
  }



  crearFormulario(){

    this.forma = this.fb.group({
     tipodoc     :['',Validators.required],
     documento   :['',Validators.required],
     pnombre     :['',Validators.required],
     snombre     :[''],
     papellido   :['',Validators.required],
     sapellido   :[''],
     genero      :['',Validators.required],
     fnacimiento :[''],
     paisr       :['',Validators.required],
     deptor      :['',Validators.required],
     ciudadr     :['',Validators.required],
     direccion   :['',Validators.required],
     telefono    :[''],
     celular     :[''],
     email       :['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]]     
      
     });
    
    }


    guardar(infoEmployee: Employee){
console.log('entro guardar')
      if (this.forma.invalid){
    
        
    
        return Object.values (this.forma.controls).forEach( control =>{
    
          if (control instanceof UntypedFormGroup) {
            Object.values (control.controls).forEach( control => control.markAsTouched());
    
          } else{
            control.markAsTouched();
          }
          
    
        });
      }
  
      if (this.forma.value.snombre.length === 0) { this.secondName = this.forma.value.snombre1} else {this.secondName =  this.forma.value.snombre }
      if (this.forma.value.sapellido.length === 0) { this.secondSurName = this.forma.value.snombre1} else {this.secondSurName=  this.forma.value.sapellido }
      
    
  
      let form = [
        {
    
  firstName:  this.forma.value.pnombre,
  secondName:  this.secondName,
  surname:  this.forma.value.papellido,
  secondSurName: this.secondSurName,
  birthDate: this.forma.value.fnacimiento,
  company_id: this.empresa.id,
  email: this.forma.value.email,
  createUser: this.usuario,
  isActive: this.isActive,
  identification: this.forma.value.documento,
  city_id: this.forma.value.ciudadr,
  gender_id: this.forma.value.genero,
  address: this.forma.value.direccion,
  phone: this.forma.value.telefono,
  cellPhone: this.forma.value.celular,
  state_id: this.forma.value.deptor,
  country_id:this.forma.value.paisr,
  identificationType_id:this.forma.value.tipodoc
         
  
        }
      ]
    
      this.registro =  JSON.parse(JSON.stringify(form[0]));
      
  
      this._employeeService.actualizarEmployee( this.employee )
              .subscribe( () => this.cargarEmployees(this.employee.id));
              this.infoEmployeeDialog = false;
      
      
    
      // this.forma.reset();
    
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
    this.infoEmployeeDialog = false;
    this.submitted = false;
}

editInfoEmployee(infoEmployee: Employee) {
  this.employees = {...infoEmployee};
  console.log('naci', this.employees);
  this.infoEmployeeDialog = true;
  this.new= false;
}


  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          this.employee = employee;
        
          if(this.employee) {
            this.getIdentificationType( this.employee.identificationType_id );
            this.getGender(this.employee.gender_id);
            this.getState(this.employee.state_id);
            this.getCity(this.employee.city_id);
            this.cargarMunicipiosDeptos(this.employee.state_id);
            this.getCountry(this.employee.country_id); 
          }
        });

  }

  getIdentificationType( id: string)  {
    this._identificationTypeService.obtenerTipoDocumentos( id )
        .subscribe( identificationType => {
          this.identificationType = identificationType;
  });
  }

  getAllIdentificationType()  {
    this._identificationTypeService.cargarTiposDocumentos()
        .subscribe( identificationType => {
          this.identificationTypes = identificationType;    
  });
  }


  getGender( id: string)  {
    this._genderService.obtenerGenero( id )
        .subscribe( gender => {
          this.gender = gender;
  });
  }

  getAllGender()  {
    this._genderService.cargarGeneros()
        .subscribe( genders => {
          this.genders = genders;    
  });
  }

  getCountry( id: string)  {
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





getState( id: string)  {
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


  getCity( id: string)  {
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






  actualizarImagen( employee: Employee ){
  
    this._modalUploadServices.mostrarModal('employee', employee.id! );
    
  }

  cargarMunicipiosDeptos(id: string) {
    this._cityService.obtenerMunicipioDepto(id)
    .subscribe( resp => this.municipios = resp);
  }

  onSelect(id: string): void {
    this.cargarMunicipiosDeptos(id);
  }


}
