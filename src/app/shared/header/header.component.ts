import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/authservice.index';

import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../auth/models/usuario.model';

import { Company } from '../../companies/models/company.model';

import { Router } from '@angular/router';
//import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
//import { CardCompanyComponent } from '../../components/card-company/card-company.component';
import Swal from 'sweetalert2';
import { Concept } from '../../companies/models/concept.model';
import { MenuItem } from 'primeng/api';
import { CompanyService } from 'src/app/companies/services/company/company.service';
//const Swal1: any = require('sweetalert2')

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})




export class HeaderComponent implements OnInit {

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
  usuario: Usuario;
  company: Company [] = [];
  concept: Concept[] = [];
  company1: any = {};
  company2: any = {};
  autenticado = 'n';
  registro: any = {};
  view: any={};
  empresa: any = {};
  empresaseleccionada: any = {};
 
  items!: MenuItem[];
  menu!: MenuItem[];

 

  constructor( public _usuarioService: AuthService,
               public _companyService: CompanyService,
               public activatedRoute: ActivatedRoute,
              // public _modalUploadService:ModalUploadService,
               public router: Router) {

                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
                this.usuario = this._usuarioService.usuario;
                // this.cargarEmpresasUsuario(this.usuario.id);
                //this.company = this._usuarioService.empresas;
                this.company =  JSON.parse(localStorage.getItem('empresas')!);
                
                
                if (this.empresaseleccionada) {
                 
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                
                 
                } else {
                  if(this.company.length > 1 ){
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                   
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  
                  }
                }
                
            
                this.cargarCompanySelect(this.empresa.id);
                this.cargarEmpresasUsuario(this.usuario.id)
              
               
               }

  ngOnInit(): void {

    this.menu = [
      {
          items: [
              {label: 'Inicio', routerLink: '/dashboard'},
              {label: 'Información Empleado', routerLink: '/employees/list'},
              {label: 'Información Empresa', routerLink: '/companies/config'},
              {label: 'Nómina', routerLink: '/payroll/novelties'},
              {label: 'Reportes'},
          ]
      },
      
  
  ]; 
   

    this.items = [
      

      {
          items: [{
                  label: 'Mi perfil', 
                  
              },
              {label: 'Cambiar Empresa'},
              {label: 'Suscripción'},
              {label: 'Logout'},
          ]
      },
      
  
  ]; 
  
   /*  this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id)); */

    

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

  cargarCompanySelect(id: string){
    this._companyService.cargarCompanys(id)
        .subscribe ( (resp:any) => {
          this.company1 = resp;
        });
  } 

  cargarEmpresasUsuario(iduser: any){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( (resp:any) => {
      this.company2 = resp
      console.log('company2', this.company2)
    });
    
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
                updateUser:this.usuario.id,
                user_id:this.usuario.id,
                isActive: this.isActive, 
                //user_id: this.usuario.id,
                
                
              }
            ]
        
            this.registro =  JSON.parse(JSON.stringify(form[0]));

            //mirar aca
           
            this._companyService.crearCompany( this.registro )
            .subscribe((resp:any) => {
              this.cargarEmpresasUsuario(this.usuario.id);
              this.router.navigate( ['/companies/list'] );
           
            });
  }
  
});

  } 

  

}
