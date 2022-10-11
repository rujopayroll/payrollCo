import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

import Swal from 'sweetalert2';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StateService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService ) {
                 
                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarDepartamentos(){
      let url = this.URL_SERVICIOS + '/states';
      return this.http.get( url, {headers: this.headers} )
           .map( (resp: any) => {
            return resp;
          });
    }
    obtenerDepartamento( id: string ){
      let url = this.URL_SERVICIOS + '/states/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any ) => resp );
    }
}