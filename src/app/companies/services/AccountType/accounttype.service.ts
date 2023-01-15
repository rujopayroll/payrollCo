import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccounttypeService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

public headers = new HttpHeaders();
  constructor( public http: HttpClient,
    public _usuarioService: AuthService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }

  cargarTipoCuentas(){
    let url = this.URL_SERVICIOS  + '/accountTypes';
    return this.http.get( url, {headers: this.headers} )
    .pipe(
         map( (resp: any) => {
          return resp;
        }));
  }
  obtenerTipoCuenta( id: string ){
    let url = this.URL_SERVICIOS  + '/accountTypes/' + id;
    return this.http.get( url, {headers: this.headers} )
    .pipe(
        map( (resp: any ) => resp ));
  }


}