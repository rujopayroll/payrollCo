import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeRecurrentPayment } from '../../models/employeeRecurrentPayment.model';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
                
               }


    
 

    cargarEmployeeRecurrentPayment( idEmployee: string){

      let url = this.URL_SERVICIOS + '/recurrentPayments?employee_id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp.reverse());
    }

    buscarEmployeeRecurrentPayment( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeePayment);
    }
    borrarEmployeeRecurrentPayment( id: string ){
      let url = this.URL_SERVICIOS + '/recurrentPayments/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de pagos recurrentes Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeRecurrentPayment( employeeRecurrentPayment: any){
      let url = this.URL_SERVICIOS + '/recurrentPayments';
      
      return this.http.post( url, employeeRecurrentPayment, {headers: this.headers})
      
          .map( (resp: any) =>{

            Swal.fire({
              text: 'datos de pagos recurrentes guardada',
              icon: 'success'
            }); 

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

    actualizarEmployeeRecurrentPayment( employeeRecurrentPayment: EmployeeRecurrentPayment ){
console.log('servicio', employeeRecurrentPayment)
      let url = this.URL_SERVICIOS + '/recurrentPayments/' + employeeRecurrentPayment.id;
      url += '?token=' + this._usuarioService.token;
      console.log(url)
      return this.http.put( url, employeeRecurrentPayment, {headers: this.headers})
      
          .map( (resp: any) =>{
            console.log('entroalservicio', resp)
            Swal.fire({
              text: 'Informacion de Pagos Recurrentes Actualizado',
              icon: 'success'
            });
            return resp.employeeRecurrentPayment;
            
          });
    }

    getEmployeeRecurrentPayment( idEmployee: string){

      let url = this.URL_SERVICIOS + '/recurrentPayments/byEmployee/' + idEmployee;
      return this.http.get( url, {headers: this.headers}, )
          .map( (resp: any) => resp.reverse() );
    }

  }