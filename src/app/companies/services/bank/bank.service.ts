import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BankService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  constructor( public http: HttpClient,
    public _usuarioService: AuthService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }

  cargarBancos(){
    let url = this.URL_SERVICIOS + '/banks';
    return this.http.get( url, {headers: this.headers} )
    .pipe(
         map( (resp: any) => {
          return resp;
        }));
  }
  obtenerBanco( id: string ){
    let url = this.URL_SERVICIOS + '/banks/' + id;
    return this.http.get( url, {headers: this.headers} )
    .pipe(
        map( (resp: any ) => resp ));
  }


}