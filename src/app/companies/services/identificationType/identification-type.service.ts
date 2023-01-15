import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { IdentificationType } from '../../models/identificationType.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  constructor( public http: HttpClient ) { 

    this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  }

  cargarTiposDocumentos(){
    let url = this.URL_SERVICIOS + '/identificationTypes';
    return this.http.get( url, {headers: this.headers})
    .pipe(
         map( (resp: any) => {
          return resp;
        }));
  }

  obtenerTipoDocumentos( id: string ){
    let url = this.URL_SERVICIOS + '/identificationTypes/' + id;
    return this.http.get( url, {headers: this.headers} )
    .pipe(
        map( (resp: any ) => resp ));
  }


}
