import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeSalary } from '../../models/employeeSalary.model';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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

                  this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
                }


    
 

    cargarEmployeeSalary( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeSalaries?employee_id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp.reverse() )
          
    }


    cargarEmployeeSalaryIsActive( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeSalaries?employee_id=' + idEmployee+ '&isActive=true';
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp );
          
    }


    buscarEmployeeSalary( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp);
    }
    borrarEmployeeSalary( id: string ){
      let url = this.URL_SERVICIOS + '/employeeSalary/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de salario empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeSalary( employeeSalary: any){
      let url = this.URL_SERVICIOS + '/employeeSalaries';
     
      return this.http.post( url, employeeSalary,  {headers: this.headers})
      
          .map( (resp: any) =>{

            Swal.fire({
              text: 'salario guardada',
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

    actualizarEmployeeSalary( employeeSalary: any ){

      let url = this.URL_SERVICIOS + '/employeeSalaries/' + employeeSalary.id;
      console.log('salario', employeeSalary)
      console.log('salario1', employeeSalary.id)
      return this.http.put( url, employeeSalary, {headers: this.headers})
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Salario Actualizado',
              icon: 'success'
            });
            return resp.employeeSalary;
          });
    }

  }
