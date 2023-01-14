import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeePayment } from '../../models/employeesPayment.model';

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
export class EmployeePaymentService  {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  employeePayment!: EmployeePayment;
  
  

  constructor( public http: HttpClient, 
               public _usuarioService: AuthService,
               public _companyService: CompanyService) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }


    
 

    cargarEmployeePayment( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeePayments?id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
      .pipe(    
      map( (resp: any) => resp ));
    }
    buscarEmployeePayment( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
          map(( resp: any ) => resp.employeePayment));
    }
    borrarEmployeePayment( id: string ){
      let url = this.URL_SERVICIOS + '/employeePayment/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
      .pipe(    
      map( (resp: any) => {
              Swal.fire({
              text: 'informacion de pago empleado Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearEmployeePayment( employeePayment: any){
      let url = this.URL_SERVICIOS + '/employeePayments';
      
      return this.http.post( url, employeePayment, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{

            Swal.fire({
              text: 'datos de pago guardada',
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

    actualizarEmployeePayment( employeePayment: EmployeePayment ){

      let url = this.URL_SERVICIOS + '/employeePayments/' + employeePayment.id;
      
      return this.http.put( url, employeePayment, {headers: this.headers})
      .pipe(    
      map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Pago Actualizado',
              icon: 'success'
            });
            return resp;
          }));
    }

  }