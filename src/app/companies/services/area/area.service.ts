import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Area } from '../../models/area.model';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';  */
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AreaService {


  private URL_SERVICIOS: string = environment.URL_SERVICIOS;
  public headers = new HttpHeaders();
  area!: Area;
  company!: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: AuthService,
               public _companyService: CompanyService) { 

                this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
               }

    cargarArea( id: string){

      let url = this.URL_SERVICIOS + '/companies/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp.areas );
    }

    obtenerArea( id: string){

      let url = this.URL_SERVICIOS + '/areas/' + id;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp );
    }

    cargarAreaCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/companies/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp );
    }

    cargarAreaCompanyActive( idcompany: string){

      let url = this.URL_SERVICIOS + '/areas?isActive=True' + '&' + 'company_id=' + idcompany ;
     
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp );
    }


    buscarArea( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.area);
    }


    borrarArea( id: string ){
      let url = this.URL_SERVICIOS + '/areas/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url , {headers: this.headers})
          .map( (resp: any) => {
              Swal.fire({
              text: 'Area Eliminada',
              icon: 'success'
            });
              return resp;
      });
    }
    crearArea( area: Area){
      const url = this.URL_SERVICIOS + '/areas';
      return this.http.post( url, area, {headers: this.headers})
      .map( (resp: any) =>{
        Swal.fire({
          text: 'Area Creada',
          icon: 'success'
        });
        return resp.area;
      })
          .catch( err =>{
            console.log(err)
            // tslint:disable-next-line: deprecation
           /*  Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            }); */
            return Observable.throwError( err );
          });
    }

    actualizarArea( area: Area ){

      let url = this.URL_SERVICIOS + '/areas/' + area.id;
      url += '?token=' + this._usuarioService.token;
      console.log('servicio',area.id)
      return this.http.put( url,  area, {headers: this.headers})
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Area Actualizado',
              icon: 'success'
            });
            return resp.area;
          });
    }


  

  }