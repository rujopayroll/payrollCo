import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeJob } from '../../models/employeeJob.model';
import { AuthService } from '../../../auth/services/authservice.index';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
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


export class EmployeeJobService  {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;

public headers = new HttpHeaders();
  employeeJob!: EmployeeJob;



  constructor( public http: HttpClient,
    public _usuarioService: AuthService,
    public _companyService: CompanyService) {

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }






    cargarEmployeeJob( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeJob/' + idEmployee;
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any) => resp ));

    }
    buscarEmployeeJob( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
      map(( resp: any ) => resp.employeeJob));
    }
    borrarEmployeeJob( id: string ){
      let url = this.URL_SERVICIOS + '/employeeJob/' + id;
      /* url += '?token=' + this._usuarioService.token; */
      return this.http.delete( url, {withCredentials: true} )
      .pipe(
      map( (resp: any) => {
              Swal.fire({
              text: 'informacion del puesto del empleado Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearEmployeeJob( employeeJob: any){
      let url = this.URL_SERVICIOS + '/employeeJob';

      return this.http.post( url, employeeJob, {withCredentials:true})
      .pipe(
      map( (resp: any) =>{

            Swal.fire({
              text: 'informacion del puesto guardada',
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

    actualizarEmployeeJob( employeeJob: EmployeeJob ){

      let url = this.URL_SERVICIOS + '/employeeJob/' + employeeJob.id;

      return this.http.put( url, employeeJob, {withCredentials: true})
      .pipe(
      map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion del puesto Actualizado',
              icon: 'success'
            });
            return resp;
          }));
    }

  }

