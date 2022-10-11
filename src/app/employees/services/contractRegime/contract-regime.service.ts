import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractRegimeService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  constructor( public http: HttpClient,
    public _usuarioService: AuthService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }

  cargarTipoRegimen(){
    let url = this.URL_SERVICIOS + '/contractRegimes';
    return this.http.get( url, {headers: this.headers}  )
         .map( (resp: any) => {
          return resp;
        });
  }
  obtenerTipoRegime( id: string ){
    let url = this.URL_SERVICIOS + '/contractRegimes/' + id;
    return this.http.get( url, {headers: this.headers}  )
        .map( (resp: any ) => resp );
  }


}