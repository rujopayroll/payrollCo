import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';
import { City } from '../../models/city.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  constructor( public http: HttpClient,
               public _usuarioService: AuthService ) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarMunicipios(){
      let url = this.URL_SERVICIOS + '/cities';
      return this.http.get( url, {headers: this.headers} )
           .map( (resp: any) => {
            return resp;
          });
    }
    obtenerMunicipio( id: string ){
      let url = this.URL_SERVICIOS + '/cities/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any ) => resp );
    }
    obtenerMunicipioDepto( id: string ){
      let url = this.URL_SERVICIOS + '/states/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any ) => resp.cities );
    }
}


