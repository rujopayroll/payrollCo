import { Injectable } from '@angular/core';
import {HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

private URL_SERVICIOS: string = environment.URL_SERVICIOS;
public headers: string
  constructor() {
    //this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    this.headers = 'Bearer ' +  localStorage.getItem('token');
  }
  //subirArchivo(archivo: File, tipo: string, id: string)
  subirArchivo(archivo: File, tipo: string, id: string){


    return new Promise( (resolve, reject)  =>{

    let formData =  new FormData();
    let xhr =  new XMLHttpRequest();

    formData.append('file', archivo, archivo.name);

    xhr.onreadystatechange = function(){

      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 || xhr.status === 202){

          resolve( JSON.parse(xhr.response));

        } else {

          reject(xhr.response);

        }
      }
    };

    let url = this.URL_SERVICIOS + '/uploadImage/Company' + '/' + id;

    xhr.open('POST', url, true, );
    xhr.setRequestHeader('Authorization', this.headers);
    xhr.send( formData );
    });
  }


  subirArchivoEmployee(archivo: File, tipo: string, id: string){


    return new Promise( (resolve, reject)  =>{

    let formData =  new FormData();
    let xhr =  new XMLHttpRequest();

    formData.append('file', archivo, archivo.name);

    xhr.onreadystatechange = function(){

      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 || xhr.status === 202){

          resolve( JSON.parse(xhr.response));

        } else {

          reject(xhr.response);

        }
      }
    };

    let url = this.URL_SERVICIOS + '/uploadImage/Employee' + '/' + id;

    xhr.open('POST', url, true, );
    xhr.setRequestHeader('Authorization', this.headers);
    xhr.send( formData );
    });
  }

  subirArchivoUser(archivo: File, tipo: string, id: string){


    return new Promise( (resolve, reject)  =>{

    let formData =  new FormData();
    let xhr =  new XMLHttpRequest();

    formData.append('file', archivo, archivo.name);

    xhr.onreadystatechange = function(){

      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 || xhr.status === 202){

          resolve( JSON.parse(xhr.response));

        } else {

          reject(xhr.response);

        }
      }
    };

    let url = this.URL_SERVICIOS + '/uploadImage/User' + '/' + id;

    xhr.open('POST', url, true, );
    xhr.setRequestHeader('Authorization', this.headers);
    xhr.send( formData );
    });
  }
}
