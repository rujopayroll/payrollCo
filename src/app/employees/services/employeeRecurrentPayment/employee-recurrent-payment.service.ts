import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeRecurrentPayment } from '../../models/employeeRecurrentPayment.model';

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
export class EmployeeRecurrentPaymentService  {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  employeeRecurrentPayment!: EmployeeRecurrentPayment;



  constructor( public http: HttpClient,
               public _usuarioService: AuthService,
               public _companyService: CompanyService) {

                //this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));

               }





    cargarEmployeeRecurrentPayment( idEmployee: string){

      let url = this.URL_SERVICIOS + '/recurrentPayment/' + idEmployee;
      return this.http.get( url, {withCredentials:true} )
      .pipe(
      map( (resp: any) => resp));
    }

    buscarEmployeeRecurrentPayment( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
      map(( resp: any ) => resp.employeePayment));
    }
    borrarEmployeeRecurrentPayment( id: string ){
      let url = this.URL_SERVICIOS + '/recurrentPayment/' + id;

      return this.http.delete( url,{withCredentials:true} )
      .pipe(
      map( (resp: any) => {
              Swal.fire({
              text: 'informacion de pagos recurrentes Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearEmployeeRecurrentPayment( employeeRecurrentPayment: any){
      let url = this.URL_SERVICIOS + '/recurrentPayment';

      return this.http.post( url, employeeRecurrentPayment, {withCredentials:true})
      .pipe(
          map( (resp: any) =>{

            Swal.fire({
              text: 'datos de pagos recurrentes guardada',
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

    actualizarEmployeeRecurrentPayment( employeeRecurrentPayment: EmployeeRecurrentPayment ){

      let url = this.URL_SERVICIOS + '/recurrentPayment/' + employeeRecurrentPayment.id;

      return this.http.put( url, employeeRecurrentPayment, {withCredentials:true})

      .pipe(
      map( (resp: any) =>{
            console.log('entroalservicio', resp)
            Swal.fire({
              text: 'Informacion de Pagos Recurrentes Actualizado',
              icon: 'success'
            });
            return resp.employeeRecurrentPayment;

          }));
    }

    getEmployeeRecurrentPayment( idEmployee: string){

      let url = this.URL_SERVICIOS + '/recurrentPayment?employee_id=' + idEmployee;
      return this.http.get( url, {withCredentials:true}, )
      .pipe(
      map( (resp: any) => {
        console.log('recuser', resp)
        return resp

  }));
}
}
