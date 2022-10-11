import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { CostCenter } from '../../models/costCenter.model';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; */
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  costCenter!: CostCenter;
  company!: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _companyService: CompanyService) {

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));

     }

    cargarCostCenter( id: string){
      
      let url = this.URL_SERVICIOS + '/companies/' + id;
      return this.http.get( url, {headers: this.headers})
          .map( (resp: any) => resp.costCenters );
    }

    obtenerCostCenter( id: string){
    
      let url = this.URL_SERVICIOS  + '/costCenters/' + id;
      return this.http.get( url, {headers: this.headers})
          .map( (resp: any) => resp );
    }

    cargarCostCenterCompany( idcompany: string){


      let url = this.URL_SERVICIOS  + '/companies/' + idcompany;
     
      return this.http.get( url, {headers: this.headers})
          .map( (resp: any) => resp );
    }

    cargarCostCenterCompanyActive( idcompany: string){


      let url = this.URL_SERVICIOS + '/costCenters?isActive=True' + '&' + 'company_id=' + idcompany;
     
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp );
    }


    buscarCostCenter( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url, {headers: this.headers} )
          .map(( resp: any ) => resp.companyPayroll);
    }

    
    borrarCostCenter( id: string ){
      let url = this.URL_SERVICIOS + '/costCenters/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url, {headers: this.headers} )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Centro de costo Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearCostCenter( costCenter: CostCenter){
      const url = this.URL_SERVICIOS + '/costCenters';
      return this.http.post( url, costCenter, {headers: this.headers})
      .map( (resp: any) =>{
        Swal.fire({
          text: 'Centro de costo Creado',
          icon: 'success'
        });
        return resp.costCenter;
      
          
            
          })
          .catch( err =>{
            console.log(err)
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    }

    actualizarCostCenter( costCenter: CostCenter ){

      let url = this.URL_SERVICIOS + '/costCenters/' + costCenter.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, costCenter, {headers: this.headers})
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Centro de costo Actualizado',
              icon: 'success'
            });
            return resp.costCenter;
          });
    }

  }