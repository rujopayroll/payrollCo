import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
// import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Company } from '../../models/company.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  company!: Company;
  companyUser: any={};
  token!: string;
  

  constructor( public http: HttpClient, 
               public _usuarioService: AuthService,
    // public _subirArhivoService: SubirArhivoService,
    ) {

    
      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
     
     }


     

     cargarCompanys( id: string){

    
      let url = this.URL_SERVICIOS + '/companies/' + id;
      
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
           
            return resp
          });
          
    } 
    
    cargarCompanysUser( iduser: string){

      //let url = URL_SERVICIOS + '/company/' + iduser;
      let url = this.URL_SERVICIOS + '/users/' + iduser;
      
      
      
      return this.http.get( url, {headers: this.headers})

          .map( (resp: any) => {
            
            return resp
            
          });
          
          
          
          
}

buscarCompanys( termino: string ) {
  let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
  return this.http.get( url )
      .map(( resp: any ) => resp.companys);
}
borrarCompanys( id: string ){
  let url = this.URL_SERVICIOS + '/company/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.delete( url )
      .map( (resp: any) => {
          Swal.fire({
          text: 'Empresa Eliminado',
          icon: 'success'
        });
          return resp;
  });
}
crearCompany( company: any){
  const url = this.URL_SERVICIOS  + '/companies';
  
  return this.http.post( url, company, {headers: this.headers})
      .map( (resp: any) =>{

       /*  Swal.fire({
          text: 'Empresa Creada',
          icon: 'success'
        }); */

        return resp.company;
      })
      .catch( err =>{
        // tslint:disable-next-line: deprecation
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error'
        });
        return Observable.throwError( err );
      });
}

actualizarCompany( company: any ){

  let url = this.URL_SERVICIOS  + '/companies/' + company.id;
 

  return this.http.put( url, company, {headers: this.headers})
      .map( (resp: any) =>{
        Swal.fire({
          text: 'Informacion básica Actualizada',
          icon: 'success'
        });
        return resp.companyPayment;
      });
      /* .catch( err =>{
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error'
        });
        return Observable.throwError( err );
      }); */

}


cambiarImagen(archivo: File, company: string ){

  const url = this.URL_SERVICIOS  + '/uploadImage/Company/' + company;
  
  return this.http.post( url, archivo, {headers: this.headers})
      .map( (resp: any) =>{

       /*  Swal.fire({
          text: 'Empresa Creada',
          icon: 'success'
        }); */

        return resp;
      })
      .catch( err =>{
        // tslint:disable-next-line: deprecation
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error'
        });
        return Observable.throwError( err );
      });
}





}
