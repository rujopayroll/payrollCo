import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Position } from '../../models/position.model';
import { Company } from '../../models/company.model';
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
export class PositionService {


  private URL_SERVICIOS: string = environment.URL_SERVICIOS;
  public headers = new HttpHeaders();
  position!: Position;
  company!: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: AuthService,
               public _companyService: CompanyService) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarPosition( id: string){

      let url = this.URL_SERVICIOS + '/companies/' + id;
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => resp.positions ));
    }

    obtenerPosition( id: string){

      let url = this.URL_SERVICIOS + '/positions/' + id;
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map( (resp: any) => resp ));
    }

    cargarPositionCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/companies/' + idcompany;
     
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map( (resp: any) => resp.positions ));
    }

    cargarPositionCompanyActive( idcompany: string){


      //let url = URL_SERVICIOS_HEROKU + '/positions/' + idcompany + '/isActive';
      let url = this.URL_SERVICIOS + '/positions?isActive=True' + '&' + 'company_id=' + idcompany;
     
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map( (resp: any) => resp ));
    }


    buscarPosition( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map(( resp: any ) => resp.position));
    }
    borrarPosition( id: string ){
      let url = this.URL_SERVICIOS + '/positions/' + id;
      
      return this.http.delete( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => {
              Swal.fire({
              text: 'Cargo Eliminada',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearPosition( position: Position){
      let url = this.URL_SERVICIOS + '/positions';
      return this.http.post( url, position, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{
           
            Swal.fire({
                text: 'Cargo Creado',
                icon: 'success'
              });
            return resp.area;
          }))
          .pipe(
          catchError( err =>{
            console.log(err)
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          }));
    }

    actualizarPosition( position: Position ){

      let url = this.URL_SERVICIOS + '/positions/' + position.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, position, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{
            Swal.fire({
              text: 'Cargo Actualizado',
              icon: 'success'
            });
            return resp.position;
          }));
    }

  }