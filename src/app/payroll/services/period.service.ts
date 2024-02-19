import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/authservice.index';
import { CompanyService } from '../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { Period } from '../models/period.model';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PeriodService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

 public headers = new HttpHeaders();



  constructor( public http: HttpClient,
    public _usuarioService: AuthService,
    public _companyService: CompanyService) {

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));

    }





    getPeriodByCompany( id: string){

      let url = this.URL_SERVICIOS + '/period?company_id=' + id;
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => {
            return resp;

          }));

    }



     getPeriodByCompanyByProcess( id: string){

        let url = this.URL_SERVICIOS + '/period?company_id=' + id + '&description=Proceso';
        return  this.http.get ( url, {headers: this.headers} )
        .pipe(
            map( (resp: any={}) => {
              return resp;

            }));

      }

      getPeriodByCompanyByPaid( id: string){

        let url = this.URL_SERVICIOS + '/period?company_id=' + id + '&description=Pagado';
        return this.http.get( url, {headers: this.headers} )
        .pipe(
            map( (resp: any) => {
              return resp;

            }));

      }

      getPeriodByCompanyByAccounted( id: string){

        let url = this.URL_SERVICIOS + '/period?company_id=' + id + '&description=Contabilizado';
        return this.http.get( url, {headers: this.headers} )
        .pipe(
            map( (resp: any) => {
              return resp;

            }));

      }

      createPeriod( id: string, year: number){

        let url = this.URL_SERVICIOS + '/period?company_id=' + id + '&year=' + year;
        console.log('token periodo', this.headers)
        return this.http.post( url, {headers: this.headers} )
        .pipe(
            map( (resp: any) => {
              console.log('servicio periodo', resp, url)
              return resp;

            }));

      }

}
