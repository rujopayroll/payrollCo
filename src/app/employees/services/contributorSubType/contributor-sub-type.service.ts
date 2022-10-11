import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ContributorSubTypeService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;  

  public headers = new HttpHeaders();

  constructor( public http: HttpClient,
    public _usuarioService: AuthService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }

  cargarSubTipoCotizante(){
    let url = this.URL_SERVICIOS + '/contributorSubTypes';
    return this.http.get( url, {headers: this.headers} )
         .map( (resp: any) => {
          return resp;
        });
  }
  obtenerSubTipoCotizante( id: string ){
    let url = this.URL_SERVICIOS + '/contributorSubTypes/' + id;
    return this.http.get( url, {headers: this.headers} )
        .map( (resp: any ) => resp );
  }


}