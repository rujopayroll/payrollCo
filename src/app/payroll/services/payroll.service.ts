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
export class PayrollService {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;
public headers = new HttpHeaders();
 
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService,
    public _periodService: PeriodService) { 

    this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

     getMovementsByPeriod( id: string){
      let url = this.URL_SERVICIOS + '/movements?period_id=' + id;
      return  this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
            return resp;
          });
    }

    getMovementsByEmployee( id: string, period:string){
        let url = this.URL_SERVICIOS + '/payroll/getPayroll?company_id=' + id + '&period_id=' + period;
        return this.http.get( url, {headers: this.headers} )
            .map( (resp: any) => {
              return resp;
            });      
      }

      getMovementsPayrollByEmployee( id: string, period:string){
        let url = this.URL_SERVICIOS + '/payroll/getResumePayroll?company_id=' + id + '&period_id=' + period;
        return this.http.get( url, {headers: this.headers} )
            .map( (resp: any) => {
              return resp;
            });   
      }



    getMovementsByConcept( id: string, period:string){
        let url = this.URL_SERVICIOS + '/movements?concept_id=' + id + '&period_id=' + period;
        return this.http.get( url, {headers: this.headers} )
            .map( (resp: any) => {
              return resp;
            });   
      }

      getMovementsNovelty(employeId: string, companyId: string, periodId: string ){
        let url = this.URL_SERVICIOS + '/novelty/getNovelties?employee_id=' + employeId + '&company_id=' + companyId + '&period_id=' + periodId + '&conceptGroup=SALARIAL';
        return this.http.get( url, {headers: this.headers} )
        .map( (resp: any) => {
          return resp
        } ); 
      }

      getMovementsNoveltyNoSalary(employeId: string, companyId: string, periodId: string ){
        let url = this.URL_SERVICIOS + '/novelty/getNovelties?employee_id=' + employeId + '&company_id=' + companyId + '&period_id=' + periodId + '&conceptGroup=NOSALARIAL';
        return this.http.get( url, {headers: this.headers} )
        .map( (resp: any) => {
          return resp
        } ); 
      }

      getMovementsNoveltyDeduction(employeId: string, companyId: string, periodId: string ){
        let url = this.URL_SERVICIOS + '/novelty/getNovelties?employee_id=' + employeId + '&company_id=' + companyId + '&period_id=' + periodId + '&conceptGroup=DEDUCCION';
        return this.http.get( url, {headers: this.headers} )
        .map( (resp: any) => {
          return resp
        } ); 
      }
      
    


      createPayroll( id: string){
        let url = this.URL_SERVICIOS + '/payroll?company_id=' + id;
        return this.http.post( url, {headers: this.headers} )
            .map( (resp: any) => {
              return resp;
            });     
      }

      saveNovelties( novelties: any){
        let url = this.URL_SERVICIOS + '/novelty/saveNovelties';
        return this.http.post( url, novelties, {headers: this.headers} )
            .map( (resp: any) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Novedad Salarial guardada',
                showConfirmButton: false,
                timer: 2000
              })
              return resp;
            });     
      }


      saveNoveltiesOverTime( overTime: any){
        let url = this.URL_SERVICIOS + '/novelty/saveNoveltiesOverTime';
        return this.http.post( url, overTime, {headers: this.headers} )
            .map( (resp: any) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Horas Extras Guardadas',
                showConfirmButton: false,
                timer: 2000
              })
              return resp;
            });
             
      }

      getNoveltiesOverTimeByEmployee( employee_id: any, company_id: any, period_id: any){
        let url = this.URL_SERVICIOS + '/novelty/getNoveltiesOverTime?employee_id=' + employee_id + '&company_id=' + company_id + '&period_id=' + period_id;
        return this.http.get( url,  {headers: this.headers} )
            .map( (resp: any) => {
              return resp;
            });    
      }

    



}