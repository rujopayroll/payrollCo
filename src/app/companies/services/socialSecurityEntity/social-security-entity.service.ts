import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocialSecurityEntityService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;


public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService ) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarEntidadesSS(){
      let url = this.URL_SERVICIOS + '/socialsecurityentities';
      return this.http.get( url, {headers: this.headers} )
           .map( (resp: any) => {
            return resp;
          });
    }

    


    obtenerEntidadSS( id: string ){
      let url = this.URL_SERVICIOS + '/socialsecurityentities/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any ) => resp );
    }

    obtenerEntidadSSPorTipo( type: string ){
      let url = this.URL_SERVICIOS + '/socialsecurityentities/' +'ByType/' + type ;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any ) => resp );
    }

     obtenerCajasCompensacion(){
      let url = this.URL_SERVICIOS + '/socialSecurityEntity/caja';
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    } 

    obtenerEntidadesRiesgo(){
      let url = this.URL_SERVICIOS + '/socialSecurityEntity/riesgo';
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesSalud(){
      let url = this.URL_SERVICIOS + '/socialSecurityEntity/salud';
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesPension(){
      let url = this.URL_SERVICIOS+ '/socialSecurityEntity/pension';
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesCesantia(){
      let url = this.URL_SERVICIOS + '/socialSecurityEntity/cesantia';
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }
    
}