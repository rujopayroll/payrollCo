import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../../../companies/services/company/company.service';
import { AuthService } from '../../../auth/services/authservice.index';
import Swal from 'sweetalert2';
import { EmployeeSocialSecurity } from '../../models/employeeSocialSecurity.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; */
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeSocialSecurityService  {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;  
  public headers = new HttpHeaders();
  employeeSocialSecurity!: EmployeeSocialSecurity;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

    cargarEmployeeSocialSecurity( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeSocialSecurities?id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => resp ));
    }
    buscarEmployeeSocialSecurity( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
          map(( resp: any ) => resp.employeeSocialSecurity));
    }
    borrarEmployeeSocialSecurity( id: string ){
      let url = this.URL_SERVICIOS + '/employeeSocialSecurity/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
      .pipe(
          map( (resp: any) => {
              Swal.fire({
              text: 'informacion de seguridad social del empleado Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearEmployeeSocialSecurity( employeeSocialSecurity: any){
      let url = this.URL_SERVICIOS + '/employeeSocialSecurities';
      
      console.log('hola',  employeeSocialSecurity )
      return this.http.post( url, employeeSocialSecurity, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{

            Swal.fire({
              text: 'informacion de seguridad social guardada',
              icon: 'success'
            }); 

            return resp;
          }))
          .pipe(
          catchError( err =>{
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          }));
    }

    actualizarEmployeeSocialSecurity( employeeSocialSecurity: EmployeeSocialSecurity ){

      let url = this.URL_SERVICIOS + '/employeeSocialSecurities/' + employeeSocialSecurity.id;
   
      return this.http.put( url, employeeSocialSecurity, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de seguridad social Actualizado',
              icon: 'success'
            });
            return resp;
          }));
    }

  }
