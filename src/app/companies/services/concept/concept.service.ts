import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Concept } from '../../models/concept.model';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';
//import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;
  public headers = new HttpHeaders();

  concept!: Concept;
  company!: Company;

  constructor( public http: HttpClient,
    public _usuarioService: AuthService,
    //public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) {

      this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    }

    cargarConcept(){

      let url = this.URL_SERVICIOS + '/concepts/';
      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp.concept ));
    }

    getConceptNovelty(idCompany: string){

      let url = this.URL_SERVICIOS + '/concepts?isNovelty=True&company_id=' + idCompany + '&conceptGroup=SALARIAL';
      console.log(url)
      return this.http.get( url )
      .pipe(
          map( (resp: any) => {

            return resp;
          }));

    }

    getConceptNoSalaryNovelty(idCompany: string){

      let url = this.URL_SERVICIOS + '/concepts?isNovelty=True&company_id=' + idCompany + '&conceptGroup=NOSALARIAL';
      console.log(url)
      return this.http.get( url )
      .pipe(
          map( (resp: any) => {

            return resp;
          }));

    }

    getConceptDeductionNovelty(idCompany: string){

      let url = this.URL_SERVICIOS + '/concepts?isNovelty=True&company_id=' + idCompany + '&conceptGroup=DEDUCCION';

      return this.http.get( url )
      .pipe(
          map( (resp: any) => {

            return resp;
          }));

    }

    getAllConceptNovelty(idCompany: string){

      let url = this.URL_SERVICIOS + '/concepts?isNovelty=True&company_id=' + idCompany;
      console.log(url)
      return this.http.get( url )
      .pipe(
          map( (resp: any) => {

            return resp;
          }));

    }

    obtenerConcept( id: string){

      let url = this.URL_SERVICIOS + '/concepts/' + id;
      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp.concept ));
    }

    obtenerConceptCompany( id: string, company_id: string){

      let url = this.URL_SERVICIOS + '/concepts/' + id + '?' + company_id;
      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp.concept ));
    }



    obtenerConceptSalary(idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts/category/salar/' + idcompany ;
      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp.concept ));
    }

    cargarConceptCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany;
     console.log('url',url)
      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }

    getConceptSalaryCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany + '&conceptGroup=SALARIAL' ;

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }

    getConceptNoSalaryCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany + '&conceptGroup=NOSALARIAL' ;

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }

    getConceptDeductionCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany + '&conceptGroup=DEDUCCION' ;

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }

    getConceptSocialBenefitCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany + '&conceptGroup=PRESTACIONESSOCIALES' ;

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }

    getConceptCustomerCompany( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts?' + 'company_id=' + idcompany + '&isCustomer=True' ;

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp )
          );
    }




    cargarConceptCompanyActive( idcompany: string){

      let url = this.URL_SERVICIOS + '/concepts/' + idcompany + '/isActive';

      return this.http.get( url )
      .pipe(
          map( (resp: any) => resp.concept ));
    }


    buscarConcept( termino: string ) {
      let url = this.URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
      .pipe(
          map(( resp: any ) => resp.companyPayroll));
    }

   /*  crearConcept( concept: Concept){
      const url = this.URL_SERVICIOS + '/concept';
      return this.http.post( url, concept)
          .map( (resp: any) =>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Creado Exitosamente'
            })
            return resp.concept;
          })
          .catch( err =>{
            console.log(err)

            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    } */


    crearConceptStandard(  id: string){
      const url = this.URL_SERVICIOS + '/concepts/estandar/' + id;
      return this.http.post( url, id )
      .pipe(
          map( (resp: any) => resp.concept));
    }



    actualizarConcept( concept: Concept ){

      let url = this.URL_SERVICIOS + '/concepts/' + concept.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, concept)
      .pipe(
          map( (resp: any) =>{
            Swal.fire({
              text: 'concepto Actualizado',
              icon: 'success'
            });
            return resp.concept;
          }));
    }



    createConcept( concept: Concept){
      const url = this.URL_SERVICIOS + '/concepts';
      return this.http.post( url, concept, {headers: this.headers})
      .pipe(
      map( (resp: any) =>{
        Swal.fire({
          text: 'Concepto Creado',
          icon: 'success'
        });
        return resp.concept;



          }))
          .pipe(
          catchError( err =>{
            console.log(err)
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          }));
    }

}
