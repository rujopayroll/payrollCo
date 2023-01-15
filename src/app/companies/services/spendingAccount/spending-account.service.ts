import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpendingAccountService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService ) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarCuentaGastos(){
      let url = this.URL_SERVICIOS + '/spendingAccounts';
      return this.http.get( url, {headers: this.headers} )
      .pipe(
           map( (resp: any) => {
            return resp;
          }));
    }
    
    obtenerCuentaGastos( id: string ){
      let url = this.URL_SERVICIOS + '/spendingAccounts/' + id;
      console.log('url', url)
      return this.http.get( url, {headers: this.headers} )
      .pipe(
          map( (resp: any ) => {
          return resp
        }));
    }
}