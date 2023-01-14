import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/services/authservice.index';
import { CompanyService } from '../../../companies/services/company/company.service';
import Swal from 'sweetalert2';
import { Employee} from '../../models/employee.model';
import { Company } from '../../../companies/models/company.model';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../employeeService.index';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private URL_SERVICIOS: string = environment.URL_SERVICIOS;

 public headers = new HttpHeaders();
  employee!: Employee;
  company!: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: AuthService,
    public _subirArhivoService: SubirArchivoService,
    public _companyService: CompanyService) { 

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }


    
 

    cargarEmployees( id: string){

      let url = this.URL_SERVICIOS + '/employees/' + id;
      return this.http.get( url, {headers: this.headers} )
      .pipe(   
      map( (resp: any) => {
            return resp;
            
          }));
           
    }


    cargarEmployeeCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/employees?company_id=' + idcompany;
     
      return this.http.get( url, {headers: this.headers} )
      .pipe(     
      map( (resp: any) => resp ));
    }

    buscarEmployees( termino: string ) {
      let url = this.URL_SERVICIOS + '/employees/search/' + termino;
      return this.http.get( url, {headers: this.headers} )
      .pipe(    
      map(( resp: any ) => resp));


    }
    borrarEmployees( id: string ){
      let url = this.URL_SERVICIOS + '/employee/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
      .pipe(    
      map( (resp: any) => {
              Swal.fire({
              text: 'Empleado Eliminado',
              icon: 'success'
            });
              return resp;
      }));
    }

    crearEmployee( employee: any){
      console.log('entro');
      const url = this.URL_SERVICIOS + '/employees';
      console.log('servicio', url)
      return this.http.post( url, employee, {headers: this.headers})
      .pipe(
          map( (resp: any) =>{

            Swal.fire({
              text: 'Empleado Creado' + '' +  employee.firstName,
              icon: 'success'
            });
            return resp;
             
          }))

          .pipe(
          catchError( err =>{
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          }));
    }

    actualizarEmployee( employee: any ){

      let url = this.URL_SERVICIOS + '/employees/' + employee.id;
      
      return this.http.put( url, employee, {headers: this.headers})
      .pipe(    
      map( (resp: any) =>{
            Swal.fire({
              text: 'Empleado Actualizado' + ' ' +  employee.firstName,
              icon: 'success'
            });
            return resp;
          }));
    }


    cambiarImagen( archivo: File, id: string ){
      this._subirArhivoService.subirArchivo( archivo, 'employee', id )
    
        .then( (resp: any) =>{
          this.employee.img = resp.employee.img;
          Swal.fire({
            text: 'Imagen Actualizada',
            icon: 'success'
          });
         
    
    
        })
        .catch( (resp:any) =>{
    
        });
    }
}
