import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from 'src/app/companies/services/company/company.service';
import { Company } from 'src/app/companies/models/company.model';
import { Usuario } from '../../models/usuario.model';
import { PeriodService } from 'src/app/payroll/services/payrollService.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  email!: string;
  usuario!: string;
  user!: string;
  recuerdame = false;
  empresa: any = {};
  companyUser: any = {};

  company: any;

  today = new Date();

  constructor( public _router: Router,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _companyServices: CompanyService) {



                this.user = localStorage.getItem('id')!;

               }

  ngOnInit(): void {


    this.user  = localStorage.getItem('id')!;

    this.email = localStorage.getItem('usuario') || '';
    if (this.email.length > 1){
      this.recuerdame = true;
    }
  }

   ingresar( forma: NgForm ){


    //this._router.navigate(['/dashboard']);

  if (forma.invalid){
    return;
  }


  let usuario = new Usuario(null!, forma.value.email, forma.value.password);

  this._usuarioService.login(usuario, forma.value.recuerdame)

      .subscribe(correcto => {


        this.user = localStorage.getItem('id')!;
        this.cargarEmpresasUsuario(this.user)


          //this._router.navigate(['/dashboard']);







                //console.log('empre', this.cargarEmpresasUsuario(this.usuario))

     //console.log('empresas',this.cargarEmpresasUsuario(JSON.parse(localStorage.getItem('id')!)))

        /* this._usuarioService.Autologin(usuario)
      .subscribe(resp => {
      }) */

        //this.empresa = this._companyServices.cargarCompanysUser(correcto.id)




      });


      /* this._usuarioService.Autologin(usuario)
      .subscribe(resp => {
      }) */

let id = localStorage.getItem('id');
//this._usuarioService.obtenerMenu(id!)


  }





  /* cargarEmpresasUsuario(iduser: any){
    this._companyServices.cargarCompanysUser(iduser).subscribe((companyUser : any) => {

      if (companyUser  && companyUser.companies) {

        this.companyUser  = { companies: companyUser.companies };
console.log('companyUser.length', this.companyUser.length)
        if ( this.companyUser.length > 1) {

          this._router.navigate(['/companies/list']);
        }else{

          this._router.navigate(['/dashboard']);
        }


      } else {

        this.companyUser  = { companies: [] };
      }
    });
    } */



    cargarEmpresasUsuario(iduser: any){

    this._companyServices.cargarCompanysUser(iduser).subscribe(
      (resp: any) => {


        if (resp && Array.isArray(resp.companies)) {
          this.companyUser = resp.companies;

          if ( this.companyUser.length > 1) {

            this._router.navigate(['/companies/list']);
          }else{

            this._router.navigate(['/dashboard']);
          }



        } else {
          this.companyUser = []; // Si no es un array, asigna un array vacío
        }
      },
      (error) => {
        console.error('Error al cargar empresas:', error);
        this.companyUser = []; // Manejo de error para evitar undefined
      }
    );
    }


}
