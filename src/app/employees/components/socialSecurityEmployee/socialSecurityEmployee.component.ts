import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeSocialSecurityService, SocialSecurityEntityService, ContributorSubTypeService,
         ContributorTypeService } from '../../services/employeeService.index';
import { ContributorType } from '../../models/contributorType.model';
import { ContributorSubType } from '../../models/contributorSubType.model';
import { SocialSecurityEntity } from '../../models/socialSecurityEntity.model';
import { EmployeeSocialSecurity } from '../../models/employeeSocialSecurity.model';
import { AuthService } from '../../../auth/services/authservice.index';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-socialSecurityEmployee',
  templateUrl: './socialSecurityEmployee.component.html',
  styleUrls: ['./socialSecurityEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SocialSecurityEmployeeComponent implements OnInit  {

  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  forma!: UntypedFormGroup;
  public date: Date = new Date();
  isActive = true;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  empresaseleccionada: any = {};
  public company: any = {};
  empresa: any = {};
  usuario: any = {};
  version = 'Angular: v' + VERSION.full;
  registro: any = {};
  submitted!: boolean;
  new!: boolean;
  public employeeSS: any = {};
  employeesSocialSecuritys: any= {};
  ssEmployeeDialog!: boolean;
  employeesSocialSecurity: any = {};
  socialSecurityEntityHealth: any = {};
  socialSecurityEntityHealths: SocialSecurityEntity[] = [];
  socialSecurityEntityPension: any = {};
  socialSecurityEntityPensions: SocialSecurityEntity[] = [];
  socialSecurityEntitySeverance: any = {};
  socialSecurityEntitySeverances: SocialSecurityEntity[] = [];
  contributorSubType: any = {};
  contributorSubTypes:  ContributorSubType[] = [];
  contributorType: any = {};
  contributorTypes: ContributorType[] = [];
  
  
  employeeSocialSecurity: EmployeeSocialSecurity = new EmployeeSocialSecurity('', '', true, '', '', '', '', '', this.date, this.date, '');


  constructor(
              private fb: UntypedFormBuilder,
              public _router: Router,
              public _usuarioService: AuthService,
              public activatedRoute: ActivatedRoute,
              private _employeeSocialSecurityService: EmployeeSocialSecurityService,
              public _socialSecurityEntityService: SocialSecurityEntityService,
              public _contributorSubTypeService: ContributorSubTypeService,
              public _contributorTypeService: ContributorTypeService,
              public pageScrollServ: PageScrollService,
              public _modalUploadServices: ModalUploadService,
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
                  this.cargarEmployeesSocialSecurity( params[ 'id' ]);
              }); 

              this.crearFormulario();

              }

  ngOnInit(): void {


    this.getAllContributorSubType();
    this.getAllContributorType();
    this.getAllSocialSecurityEntityHealth();
    this.getAllSocialSecurityEntityPension();
    this.getAllSocialSecurityEntitySeverance();


    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployeesSocialSecurity( params[ 'id' ]));
    });

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
  }

  get contributorTypeNoValido(){return this.forma.get('contributorType')!.invalid && this.forma.get('contributorType')!.touched}
  get contributorSubTypeNoValido(){return this.forma.get('contributorSubType')!.invalid && this.forma.get('contributorSubType')!.touched}
  get entityHealthNoValido(){return this.forma.get('entityHealth')!.invalid && this.forma.get('entityHealth')!.touched}
  get entityPensionNoValido(){return this.forma.get('entityPension')!.invalid && this.forma.get('entityPension')!.touched}
  get entitySeveranceNoValido(){return this.forma.get('entitySeverance')!.invalid && this.forma.get('entitySeverance')!.touched}
 
  crearFormulario(){

    this.forma = this.fb.group({
     
      contributorType       : ['', Validators.required],
      contributorSubType:  ['', Validators.required],
      entityHealth    : ['', Validators.required],
      entityPension : ['', Validators.required],
      entitySeverance : ['', Validators.required]
     });
    }

    guardar(socialSecurityEmployee: EmployeeSocialSecurity){

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
          id: id,
          contributorType_id: this.forma.value.contributorType,
          contributorSubType_id: this.forma.value.contributorSubType,
          entityHealth_id: this.forma.value.entityHealth,
          entityPension_id: this.forma.value.entityPension,
          entitySeverance_id: this.forma.value.entitySeverance
         
  
        }
      ]
   
    
      this.registro =  JSON.parse(JSON.stringify(form[0]));
      
  
      this._employeeSocialSecurityService.actualizarEmployeeSocialSecurity( this.employeeSS )
              .subscribe( () => this.cargarEmployeesSocialSecurity(this.employeeSS.id));
              this.ssEmployeeDialog = false;
      
      
    
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
    this.ssEmployeeDialog = false;
    this.submitted = false;
}

editSSEmployee(socialSecurityEmployee: EmployeeSocialSecurity) {
  this.employeesSocialSecuritys = {...socialSecurityEmployee};
  this.ssEmployeeDialog = true;
  this.new= false;
}

  cargarEmployeesSocialSecurity( id: string ) {
    this._employeeSocialSecurityService.cargarEmployeeSocialSecurity( id )
        .subscribe( employeeSocialSecurity => {
          this.employeeSS = employeeSocialSecurity[0];
         
          if (this.employeeSS){

            this.getSocialSecurityEntityHealth( this.employeeSS.entityHealth_id );
            this.getSocialSecurityEntityPension( this.employeeSS.entityPension_id );
            this.getSocialSecurityEntitySeverance( this.employeeSS.entitySeverance_id);
            this.getContributorType( this.employeeSS.contributorType_id);
            this.getContributorSubType( this.employeeSS.contributorSubType_id);
          } 
        
         
        });

  }

  getSocialSecurityEntityHealth( id: string)  {
    this._socialSecurityEntityService.obtenerEntidadSS(id)
        .subscribe( socialSecurityEntityHealth => {
         
          this.socialSecurityEntityHealth = socialSecurityEntityHealth;
  });
  }

  getAllSocialSecurityEntityHealth()  {
    this._socialSecurityEntityService.obtenerEntidadSSPorTipo('EPS')
        .subscribe( socialSecurityEntityHealth => {
         
          this.socialSecurityEntityHealths = socialSecurityEntityHealth;
  });
  }
  
  getSocialSecurityEntityPension( id: string)  {
    this._socialSecurityEntityService.obtenerEntidadSS( id )
        .subscribe( socialSecurityEntityPension => {
          this.socialSecurityEntityPension = socialSecurityEntityPension;
  });
  }

  getAllSocialSecurityEntityPension()  {
    this._socialSecurityEntityService.obtenerEntidadSSPorTipo('AFP')
        .subscribe( socialSecurityEntityPension => {
          this.socialSecurityEntityPensions = socialSecurityEntityPension;
  });
  }
  
  getSocialSecurityEntitySeverance( id: string)  {
    this._socialSecurityEntityService.obtenerEntidadSS( id )
        .subscribe( socialSecurityEntitySeverance => {
          this.socialSecurityEntitySeverance = socialSecurityEntitySeverance;
  });
  }

  getAllSocialSecurityEntitySeverance()  {
    this._socialSecurityEntityService.obtenerEntidadSSPorTipo('CES')
        .subscribe( socialSecurityEntitySeverance => {
          this.socialSecurityEntitySeverances = socialSecurityEntitySeverance;
  });
  }
  
  getContributorSubType( id: string)  {
    this._contributorSubTypeService.obtenerSubTipoCotizante( id )
        .subscribe( contributorSubType => {
          this.contributorSubType = contributorSubType;
  });
  }

  getAllContributorSubType()  {
    this._contributorSubTypeService.cargarSubTipoCotizante()
        .subscribe( contributorSubType => {
          this.contributorSubTypes = contributorSubType;
  });
  }
  
  getContributorType( id: string)  {
    this._contributorTypeService.obtenerTipoCotizante( id )
        .subscribe( contributorType => {
          this.contributorType = contributorType;
  });
  }

  getAllContributorType()  {
    this._contributorTypeService.cargarTipoCotizante()
        .subscribe( contributorType => {
          this.contributorTypes = contributorType;
  });
  }
 

}
