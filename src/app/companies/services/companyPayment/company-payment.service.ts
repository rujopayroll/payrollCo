import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { CompanyPayment } from '../../models/companyPayment.model';
import { Company } from '../../models/company.model';
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
export class CompanyPaymentService {
 
private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  companyPayment: any = {};
  company!: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService) { 


      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

    cargarCompanyPayment( id: string){

      let url = this.URL_SERVICIOS + '/companyPayments/' + id;
      return this.http.get( url, {headers: this.headers})
          .map( (resp: any) => resp );
    }
    buscarCompanyPayment( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url, {headers: this.headers} )
          .map(( resp: any ) => resp.companyPayment);
    }
    borrarCompanyPayment( id: string ){
      let url = this.URL_SERVICIOS + '/companyPayments/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url, {headers: this.headers} )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Empresa Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearCompanyPayment( companyPayment: CompanyPayment){
      const url = this.URL_SERVICIOS + '/companyPayments';
      return this.http.post( url, companyPayment, {headers: this.headers})
          .map( (resp: any) =>{

           /*  Swal.fire({
              text: 'Empresa Creada',
              icon: 'success'
            }); */

            return resp.companyPayment;
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

    actualizarCompanyPayment( companyPayment: any ){

      let url = this.URL_SERVICIOS + '/companyPayments/' + companyPayment.id;
      
      return this.http.put( url, companyPayment, {headers: this.headers})
          .map( (resp: any) =>{
            console.log('servicio', companyPayment )
            Swal.fire({
              text: 'Informacion de pago Actualizado',
              icon: 'success'
            });
            return resp.companyPayment;
          });
    }

  }