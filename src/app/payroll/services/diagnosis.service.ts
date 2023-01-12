import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/authservice.index';
import { CompanyService } from '../../companies/services/company/company.service';
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
export class DiagnosisService {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;
public headers = new HttpHeaders();
 
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService,
    public _periodService: PeriodService) { 

    this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

     getDiagnosis(){
      let url = this.URL_SERVICIOS + '/diagnosis';
      return  this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => {
            return resp;
          });
    }

}