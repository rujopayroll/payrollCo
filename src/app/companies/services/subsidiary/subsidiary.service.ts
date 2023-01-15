import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Subsidiary } from '../../models/subsidiary.model';
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
export class SubsidiaryService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;
  public headers = new HttpHeaders();
  subsidiary!: Subsidiary;
  company!: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: AuthService,
               public _companyService: CompanyService) {

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
                }

    cargarSubsidiary( id: string){

      let url = this.URL_SERVICIOS + '/companies/' + id;
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => resp.subsidiaries ));
    }

    obtenerSubsidiary( id: string){

      let url = this.URL_SERVICIOS + '/subsidiaries/' + id;
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => resp ));
    }

    cargarSubsidiaryCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/companies/' + idcompany;
     
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => resp.subsidiaries ));
    }

    cargarSubsidiaryCompanyActive( idcompany: string){

//let url = URL_SERVICIOS_HEROKU + '/costCenters?isActive=True' + '&' + 'company_id=' + idcompany;
      let url = this.URL_SERVICIOS + '/subsidiaries?isActive=True' + '&' + 'company_id=' + idcompany;
     
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map( (resp: any) => resp ));
    }

    buscarSubsidiary( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url, {headers: this.headers})
      .pipe(
          map(( resp: any ) => resp.subsidiary));
    }

    
    borrarSubsidiary( id: string ){
      let url = this.URL_SERVICIOS + '/subsidiaries/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url, {headers: this.headers} )
      .pipe(
          map( (resp: any) => {
              Swal.fire({
              text: 'Sucursal Eliminada',
              icon: 'success'
            });
              return resp;
      }));
    }
    crearSubsidiary( subsidiary: Subsidiary){
      const url = this.URL_SERVICIOS + '/subsidiaries';
      return this.http.post( url, subsidiary, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{
            Swal.fire({
                text: 'Sucursal Creada',
                icon: 'success'
              });
            
            
            
            return resp.subsidiaries;
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

    actualizarSubsidiary( subsidiary: Subsidiary ){

      let url = this.URL_SERVICIOS + '/subsidiaries/' + subsidiary.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, subsidiary, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{
            Swal.fire({
              text: 'Sucursal Actualizada',
              icon: 'success'
            });
            return resp.subsidiary;
          }));
    }

  }