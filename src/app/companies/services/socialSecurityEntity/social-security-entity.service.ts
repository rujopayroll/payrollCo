import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocialSecurityEntityService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;


public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService ) {

                //this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarEntidadesSS(){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all';
      return this.http.get( url, {withCredentials:true} )
      .pipe(
           map( (resp: any) => {
            return resp;
          }));
    }




    obtenerEntidadSS( id: string ){
      let url = this.URL_SERVICIOS + '/social_security_entity/' + id;
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp ));
    }

    obtenerEntidadSSPorTipo( type: string ){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"'+ type +'","isActive":true}}'
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp ));
    }

     obtenerCajasCompensacion(){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"CCF","isActive":true}}';
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp.socialSecurityEntity ));
    }

    obtenerEntidadesRiesgo(){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"ARL","isActive":true}}';
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp.socialSecurityEntity ));
    }

    obtenerEntidadesSalud(){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"EPS","isActive":true}}';
      console.log(url);
      return this.http.get( url , {withCredentials:true})
      .pipe(
          map( (resp: any ) => resp.socialSecurityEntity ));
    }

    obtenerEntidadesPension(){
      let url = this.URL_SERVICIOS+ '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"AFP","isActive":true}}';
      console.log(url);
      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp.socialSecurityEntity ));
    }

    obtenerEntidadesCesantia(){
      let url = this.URL_SERVICIOS + '/social_security_entity/get_all?relationFilters={"socialSecurityEntityType":{"code":"CES","isActive":true}}';

      return this.http.get( url, {withCredentials:true} )
      .pipe(
          map( (resp: any ) => resp.socialSecurityEntity ));
    }

}
