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

                //this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
                }

    cargarSubsidiary( id: string){

      let url = this.URL_SERVICIOS + '/subsidiary';
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any) => resp ));
    }



    obtenerSubsidiary( id: string){

      let url = this.URL_SERVICIOS + '/subsidiary/' + id;
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any) => resp ));
    }

    cargarSubsidiaryCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/companies/' + idcompany;

      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any) => resp.subsidiaries ));
    }

    cargarSubsidiaryCompanyActive( idcompany: string){

//let url = URL_SERVICIOS_HEROKU + '/costCenters?isActive=True' + '&' + 'company_id=' + idcompany;
      let url = this.URL_SERVICIOS + '/subsidiary?isActive=True' + '&' + 'company_id=' + idcompany;

      return this.http.get( url, {withCredentials:true})
      .pipe(
          map( (resp: any) => resp ));
    }

    buscarSubsidiary( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url, {withCredentials:true})
      .pipe(
          map(( resp: any ) => resp.subsidiary));
    }


    borrarSubsidiary( id: string ){
      let url = this.URL_SERVICIOS + '/subsidiary/' + id;

      return this.http.delete( url, {withCredentials:true} )
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
      const url = this.URL_SERVICIOS + '/subsidiary';
      console.log('sucursal', subsidiary)
      return this.http.post( url, subsidiary, {withCredentials:true})
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
            //return Observable.throwError( err );
            return throwError(() => new Error('Error del servidor'));
          }));
    }

    actualizarSubsidiary( subsidiary: Subsidiary ){

      let url = this.URL_SERVICIOS + '/subsidiary/' + subsidiary.id;

      return this.http.put( url, subsidiary, {withCredentials:true})
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
