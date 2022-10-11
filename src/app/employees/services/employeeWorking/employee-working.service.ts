import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeWorking } from '../../models/employeeWorking.model';
import { AuthService } from '../../../auth/services/authservice.index';
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
export class EmployeeWorkingService {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;

public headers = new HttpHeaders();
  employeeWorking!: EmployeeWorking;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

    cargarEmployeeWorking( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeWorkings?id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp );
    }


    

    buscarEmployeeWorking( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeWorking);
    }
    borrarEmployeeWorking( id: string ){
      let url = this.URL_SERVICIOS + '/employeeWorking/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion laboral empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeWorking( employeeWorking: any){
      let url = this.URL_SERVICIOS + '/employeeWorkings';
     console.log('url', url)
     console.log('servicio', employeeWorking)
      return this.http.post( url, employeeWorking, {headers: this.headers})
          .map( (resp: any) =>{

            Swal.fire({
              text: 'Información laboral guardada',
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

    actualizarEmployeeWorking( employeeWorking: any ){

      let url = this.URL_SERVICIOS + '/employeeWorkings/' + employeeWorking.id;
    console.log('servicio',employeeWorking)
      return this.http.put( url, employeeWorking, {headers: this.headers})
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion laboral Actualizado',
              icon: 'success'
            });
            return resp;
          });
    }

  }