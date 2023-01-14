import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { EmployeeContract } from '../../models/employeeContract.model';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { SubirArchivoService } from '../subir-archivo.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeContractService  {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  public headers = new HttpHeaders();
  employeeContract!: EmployeeContract;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _subirArhivoService: SubirArchivoService,
    public _companyService: CompanyService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

    cargarEmployeeContract( idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeContracts?employee_id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
          .map( (resp: any) => resp.reverse() );
    }

    cargarEmployeeContractActive(idEmployee: string){

      let url = this.URL_SERVICIOS + '/employeeContracts?isActive=True&employee_id=' + idEmployee;
      return this.http.get( url, {headers: this.headers} )
       
      .map( (resp: any) => resp );
      
    }

    buscarEmployeeContract( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeContract);
    }
    borrarEmployeeContract( id: string ){
      let url = this.URL_SERVICIOS + '/employeeContract/' + id;
      
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de contrato empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeContract( employeeContract: EmployeeContract){
      let url = this.URL_SERVICIOS + '/employeeContracts';
  
      return this.http.post( url, employeeContract, {headers: this.headers})
          .map( (resp: any) =>{

            Swal.fire({
              text: 'contrato guardada',
              icon: 'success'
            }); 

            return resp;
          })
          .catch( err =>{
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    }

    actualizarEmployeeContract( employeeContract: EmployeeContract ){

      let url = this.URL_SERVICIOS + '/employeeContracts/' + employeeContract.id;
      console.log('contratoservicio', employeeContract)
      return this.http.put( url, employeeContract, {headers: this.headers})
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Contrato Actualizado',
              icon: 'success'
            });
            return resp;
          });
    }

  }