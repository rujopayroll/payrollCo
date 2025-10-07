import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeSalary } from '../../models/employeeSalary.model';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; */
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryService  {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

 public headers = new HttpHeaders();
  employeeSalary!: EmployeeSalary;



  constructor( public http: HttpClient,
               public _usuarioService: AuthService,
               public _companyService: CompanyService) {

                  //this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
                }





    cargarEmployeeSalary( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeSalary/' + idEmployee;
      return this.http.get( url, {withCredentials:true} )
      .pipe(
      map( (resp: any) => resp ));

    }


    cargarEmployeeSalaryIsActive( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeSalary/' + idEmployee+ '?isActive=true';
      return this.http.get( url, {withCredentials:true} )
      .pipe(
      map( (resp: any) => resp ));

    }


    buscarEmployeeSalary( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
          map(( resp: any ) => resp));
    }
    borrarEmployeeSalary( id: string ){
      let url = this.URL_SERVICIOS + '/employeeSalary/' + id;

      return this.http.delete( url,{withCredentials:true})
      .pipe(
          map( (resp: any) => {
              Swal.fire({
              text: 'informacion de salario empleado Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearEmployeeSalary( employeeSalary: any){
      let url = this.URL_SERVICIOS + '/employeeSalary';

      return this.http.post( url, employeeSalary,  {withCredentials:true})
      .pipe(
          map( (resp: any) =>{

            Swal.fire({
              text: 'salario guardada',
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
            //return Observable.throwError( err );
            return throwError(() => new Error('Error del servidor'));
          }));

    }

    actualizarEmployeeSalary( employeeSalary: any ){

      let url = this.URL_SERVICIOS + '/employeeSalary/' + employeeSalary.id;

      return this.http.put( url, employeeSalary, {withCredentials:true})
      .pipe(
      map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Salario Actualizado',
              icon: 'success'
            });
            return resp.employeeSalary;
          }));
    }

  }
