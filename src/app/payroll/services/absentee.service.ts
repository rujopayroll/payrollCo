import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/authservice.index';
import { CompanyService } from '../../companies/services/companyService.index';
import { PeriodService } from '../services/payrollService.index'
import Swal from 'sweetalert2';
import { Period } from '../models/period.model';
import { Movements } from '../models/movements.model'

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { data } from 'jquery';



@Injectable({
  providedIn: 'root'
})
export class AbsenteeService {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;
public headers = new HttpHeaders();
 
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService,
    public _periodService: PeriodService) { 

    this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

     getAbsenteeType(){
      let url = this.URL_SERVICIOS + '/absenteeTypes';
      
      return  this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
            console.log('servicio tipos', resp)
            return resp;
          });
    }

    getAbsenteeTypeById(id: string){
      let url = this.URL_SERVICIOS + '/absenteeTypes?id=' + id;
      
      return  this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
            console.log('servicio tipos', resp)
            return resp;
          });
    }

    getAbsenteeByEmployeeByPeriod(employee_id: string, iniPeriod:Date, endPeriod:Date){
      let url = this.URL_SERVICIOS + '/absenteeHistories/absenteePeriodByEmployee?employee_id=' + employee_id + '&iniPeriod=' + iniPeriod + '&endPeriod=' + endPeriod;
      console.log(url)
      return  this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
            console.log('servicio',resp)
            return resp;
            
          });
    }

}