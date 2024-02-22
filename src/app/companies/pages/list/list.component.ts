import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import { ConceptService } from '../../../companies/services/concept/concept.service';



import { Company } from '../../../companies/models/company.model';
import { Concept } from '../../../companies/models/concept.model';
import { Usuario } from '../../../auth/models/usuario.model';
import { Router } from '@angular/router';

import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  correo: any;
  idCompany: any;
  concept: Concept[] = [];
  isActive = true;
  registro: any = {};
  //idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';


  companys: Company [] = [];
  companyUser: any[]=[]
  usuario: Usuario;

  constructor( public _usuarioService: AuthService,
               public _companyService: CompanyService,
               public _conceptService: ConceptService,
               public router: Router,
               public _modalUploadService: ModalUploadService ) {


                //this.company = this._usuarioService.empresas;
    //this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);

   /*  if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
    } else {
      if(this.company.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
      }
    } */


  //this.cargarEmpresas();
  //this.usuario = this._usuarioService.usuario;

  //this.cargarEmpresasUsuario(this.usuario.id!);



                }

  ngOnInit(): void {
  //  this.cargarEmpresas();

    //this.usuario = this._usuarioService.usuario;
   // debugger

    this.cargarEmpresasUsuario(this.usuario.id!)








  }






  cargarEmpresas(){
    this.companys = this._usuarioService.empresas;
  }

  vercompany( idx: any ){
    this.router.navigate( ['/dashboard'] );
  }

  actualizarImagen( company: Company ){

    this._modalUploadService.mostrarModal('companys', company.id );

  }


    cargarEmpresasUsuario(iduser: string){
      this._companyService.cargarCompanysUser(iduser)
      .subscribe ( companyUser => {
        this.companyUser = companyUser.companies
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
            isActive: this.isActive,
            user_id: this.usuario.id,


          }
        ]

        this.registro =  JSON.parse(JSON.stringify(form[0]));

        //mirar aca

        this._companyService.crearCompany( this.registro )
        .subscribe(respc => {
          this.cargarEmpresasUsuario(this.usuario.id!);


        });
}

});
}

profile(){

  this.router.navigate(['/profile']);
}

}
