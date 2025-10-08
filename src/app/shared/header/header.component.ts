import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { AuthService } from '../../auth/services/authservice.index';

import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../auth/models/usuario.model';

import { Company } from '../../companies/models/company.model';

import { Router } from '@angular/router';
import { ModalUploadService } from '../../companies/components/modal-upload/modal-upload.service';
//import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
//import { CardCompanyComponent } from '../../components/card-company/card-company.component';
import Swal from 'sweetalert2';
import { Concept } from '../../companies/models/concept.model';
import { MenuItem } from 'primeng/api';
import { CompanyService } from 'src/app/companies/services/company/company.service';
import { OverlayPanel } from 'primeng/overlaypanel';

//const Swal1: any = require('sweetalert2')

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})




export class HeaderComponent implements OnInit {
  @ViewChild('userPanel') userPanel!: OverlayPanel;
  @ViewChild('menuPanel') menuPanel!: OverlayPanel;

  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  correo: any;
  idCompany: any;
  isActive = true;
  idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';

  compa: any = {}
  companys: Company [] = [];
  usuario!: Usuario;
  company: Company [] = [];
  concept: Concept[] = [];
  company1: any = {};
  company2: any = {};
  autenticado = 'n';
  registro: any = {};
  view: any={};
  empresa: any = {};
  empresaseleccionada: any = {};
  Id!: string;
  user: any = {};

  items!: MenuItem[];
  menu!: MenuItem[];




  constructor( public _usuarioService: AuthService,
               public _companyService: CompanyService,
               public activatedRoute: ActivatedRoute,
               private location: Location,
               public _modalUploadService:ModalUploadService,
               public router: Router,
               @Inject(DOCUMENT) private document: Document) {

                this.idUser = localStorage.getItem('id')!;
                this.correo = localStorage.getItem('usuario')!;


               // this.empresaseleccionada = localStorage.getItem('empresaseleccionada');



                /* if (this.empresaseleccionada) {

                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);


                } else {
                  if(this.company1.length > 1 ){
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);

                  } else {
                    this.cargarEmpresasUsuario(this.idUser);
                    this.empresa =  JSON.parse(JSON.stringify(this.company2[0].id));

                  }
                } */

               /*  this._modalUploadService.notificacion
                .subscribe( () => this.getUsers(this.idUser!));

                this._modalUploadService.notificacion

              .subscribe( () => this.cargarEmpresasUsuario(this.empresa.id)); */



               }

  ngOnInit(): void {
                //this.idUser = localStorage.getItem('id')!;
                //this.correo = localStorage.getItem('usuario')!;
                //this.cargarEmpresasUsuario(this.idUser);

    //this.usuario = this._usuarioService.usuario;
    //this.cargarCompanySelect(this.empresa.id);
    this.cargarEmpresasUsuario(this.idUser);
    this.getUsers(localStorage.getItem('id')!);


    this.menu = [
      {
          items: [
              {label: 'Inicio', routerLink: '/dashboard', icon:'pi pi-th-large'},
              {label: 'Información Empleado', routerLink: '/employees/list', icon:'pi pi-users'},
              {label: 'Información Empresa', routerLink: '/companies/config', icon:'pi pi-cog'},
              {label: 'Nómina', routerLink: '/payroll/novelties', icon:'pi pi-dollar'},
              {label: 'Reportes', icon:'pi-file-pdf'},
          ]
      },


  ];










     this._modalUploadService.notificacion
    //.subscribe( () => this.cargarCompanySelect(this.empresa[0].id));
    .subscribe( () => this.cargarEmpresasUsuario(this.empresa[0].id));

    this._modalUploadService.notificacion
    .subscribe( () => this.getUsers(this.idUser!));

  }





  buscar( termino: string){
      this.router.navigate(['/busqueda', termino]);
  }

  vercompany( event: any ){
    this.compa = JSON.stringify(event.empresa);
  }

  /* cargarEmpresasUsuario(id: string){
    this._companyService.cargarCompanysUser(id)
    .subscribe ( resp => this.companys1 = resp);
  } */

  /* cargarCompanySelect(id: string){
    this._companyService.cargarCompanys(id)
        .subscribe ( (resp:any) => {
          console.log('entro cargarCompanySelect')
          this.company1 = resp;
        });
  } */



  /* cargarEmpresasUsuario(iduser: any){
  this._companyService.cargarCompanysUser(iduser).subscribe((resp: any) => {
    console.log('Respuesta de la API:', resp);
    if (resp && resp.companies) {
      this.company2 = { companies: resp.companies };
      this.usuario = resp.user;
    } else {
      this.company2 = { companies: [] };
    }
  });
  } */


  cargarEmpresasUsuario(iduser: any) {
    this._companyService.cargarCompanysUser(iduser).subscribe(
      (resp: any) => {
        if (resp && resp.companies) {
          this.company1 = { companies: resp.companies };
          this.usuario = resp.user;
          console.log('empresas1', this.company1)
          console.log('empresas2', resp.companies)
          console.log('company1', this.company1.companies.length)
          if(this.company1.companies.length > 1 ){
            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);

            this.items = [


              {
                  items: [{
                          label: 'Mi perfil', routerLink: '/auth/profile', icon: 'pi pi-user'},
                      {label: 'Nueva Empresa', command: () => this.crearEmpresa(),
                      icon: 'pi pi-building',},

                      ...(this.company1?.companies?.length > 1 ? [{
                        label: 'Cambiar de Empresa',
                        icon: 'pi pi-arrow-right-arrow-left',
                        routerLink: '/companies/list',

                      }] : []),

                      /* {label: 'Cambiar Empresa', routerLink: '/companies/list',
                      disabled: !(this.company1?.companies?.length > 1) }, */
                      {label: 'Suscripción', icon: 'pi pi-credit-card'},
                      {label: 'Logout', command: () => this._usuarioService.logout(),
                      icon: 'pi pi-power-off'},
                  ]
              },


          ];

          }else{
            this.empresa =  this.company1.companies[0];
          }

        } else {
          this.company1 = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
        }

        this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
      },
      (error) => {
        console.error('Error al cargar las empresas:', error);
        this.company1 = { companies: [] }; // En caso de error, aseguramos que no falle
      }
    );
  }

screen(){
  console.log('view', this.view)

  this.activatedRoute.params.subscribe( params =>{


    this.view = params
    if (!params[ 'id' ]) {



      this.router.navigate(['/dashboard']);
    } else {


        this.router.navigate(['/companies/list']);

      }
});

}

crearEmpresa(){

    Swal.fire({
      title: 'Ingrese el nombre de la Compañia',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value: string | any[]): any => {
        if ( !value || value.length === 0) {
          return 'No ha ingresado ningun dato';
        }





            const form = [
              {

                companyName:value,
                email:this.usuario.userName,
                createUser:this.usuario.id,
                /* updateUser:this.usuario.id, */
                user_id:this.usuario.id,
                isActive: this.isActive,
                //user_id: this.usuario.id,


              }
            ]

            this.registro =  JSON.parse(JSON.stringify(form[0]));

            //mirar aca

            console.log('registro', this.registro )

            this._companyService.crearCompany( this.registro )
            .subscribe((resp:any) => {
              this.cargarEmpresasUsuario(this.idUser);
              this.router.navigate( ['/companies/list'] );

            });
  }

});

  }

  foro(){
    let Id = sessionStorage.getItem('Id')!;

    //this.router.navigate( ['app-animo.atc-onlinead.com/boards/index'] );
    //const url = 'www.google.com'
    const link = this.document.createElement('a');
    link.target = '_blank';
    link.href = 'https://app-animo.atc-onlinead.com/login/' + Id;
    link.click();
    link.remove();
    /* console.log('url', url)
    window.open(url, '_blank'); */

   /*  let usuario = new Usuario(null!,this.usuario.userName, '123456');
     console.log('auto', usuario)
    this._usuarioService.Autologin(usuario)
      .subscribe(correcto => {
        console.log('autologin', usuario)
      }); */

  }

profile(){

  this.router.navigate(['/profile']);
}

getUsers(id: string) {
  this._usuarioService.getUsers( id )
      .subscribe( user => {

        this.user = user

      });

}

showUserPanel(event: Event) {
  this.userPanel.toggle(event);
}

showMenuPanel(event: Event) {
  this.menuPanel.toggle(event);
}


}
