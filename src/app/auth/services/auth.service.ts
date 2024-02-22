import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import { map, catchError, tap } from 'rxjs/operators';
//import { catch } from 'rxjs/operators';

//import 'rxjs/add/Operator/tap';
//import 'rxjs/add/Operator/map';
//import 'rxjs/add/Operator/catch';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';

import { ModalUploadService } from '../../companies/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
// import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_SERVICIOS: string = environment.URL_SERVICIOS;

  usuario!: Usuario;
  token!: string;
  refreshToken!: string;
  menu: any = {};
  submenu: any = {};
  empresas: any = {};

  public headers = new HttpHeaders();

  private user = new BehaviorSubject< Usuario | null > (null);
  user$ = this.user.asObservable();

  get _usuario(): Usuario{
    return {...this._usuario!}
  }

  constructor( public http: HttpClient,
               public _router: Router,
               public _modalUploadServices: ModalUploadService
               //public _subirArchivoService: SubirArhivoService
               ) {
                this.cargarStorage();

                this.headers = this.headers.set('Authorization', 'Bearer '+ this.token);



  }

  renuevaToken(usuario: string){
    let url = this.URL_SERVICIOS + '/auth_tok/getToken';
    // url += '?token=' + this.token;
    /* url += '?id' + this.usuario.id;
     url += '?token=' + this.token; */

    return this.http.post( url, usuario, {headers: this.headers})

    .pipe(
    map( (resp: any) =>{

          this.token = resp.data.token;
          this.refreshToken = resp.data.refreshToken
          localStorage.setItem( 'token', this.token );
          localStorage.setItem( 'refreshToken', this.refreshToken);

          return true;

        })
    )
    .pipe(
    catchError( err => {
      console.log('error', err)
          this._router.navigate(['/auth/login']);
          // tslint:disable-next-line: deprecation
          Swal.fire({
            title: 'No se pudo renovar el token',
            text: 'No fue posible renovar el token',
            icon: 'error'
          });
          return Observable.throwError( err );
        }));
  }


  //guardarStorage(id: string, token: string, usuario: Usuario, menu: any, empresas:any){
     guardarStorage(token: string,id: string,  usuario: Usuario, empresas:any, refreshToken: string){

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('id', id);

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('empresas', JSON.stringify(empresas));

    this.usuario = usuario;
    this.token = token;
    this.refreshToken = refreshToken;
    this.empresas = empresas;

  }

  //guardarSessionStorage(token: string,id: string,  usuario: Usuario, empresas:any, refreshToken: string){

  guardarSessionStorage(id: string){


    //sessionStorage.setItem('refreshToken', refreshToken);
    //sessionStorage.setItem('id', id);

  sessionStorage.setItem('Id', id);
  //sessionStorage.setItem('userName', JSON.stringify(usuario.name));
  //sessionStorage.setItem('userEmail', JSON.stringify(usuario.userName));
  //sessionStorage.setItem('userToken', token);
  //sessionStorage.setItem('empresas', JSON.stringify(empresas));


  //this.usuario = usuario;
  //this.token = token;
  //this.refreshToken = refreshToken;
  //this.empresas = empresas;

}






  estaLogueado(){
    return (this.token.length > 5 )? true : false;
  }

  cargarStorage(){
    if ( localStorage.getItem('token')){
          this.token = localStorage.getItem('token')!;
          this.refreshToken = localStorage.getItem('refreshToken')!;
          this.usuario =  JSON.parse(localStorage.getItem('usuario')!);
          this.menu =  JSON.parse(localStorage.getItem('menu')!);
          this.empresas =  JSON.parse(localStorage.getItem('empresas')!);
    } else {
      this.token = '';
      this.usuario = null!;
      this.menu = [];
      this.empresas = [];
    }
  }


  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ){
      localStorage.setItem('email', usuario.userName);
    } else {
      localStorage.removeItem('email');
    }

    //let url = URL_SERVICIOS + '/login';
    let url = this.URL_SERVICIOS + '/auth_log/login';
    return this.http.post( url, usuario )
    .pipe(

    map( (resp: any) =>{

               // this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu, resp.empresas );


                // this.guardarStorage( resp.user.id, resp.token, resp.user, resp.user.menu.menus, resp.user.companies );
                this.guardarStorage( resp.token, resp.user.id, resp.user, resp.user.companies, resp.refreshToken );
                //this.guardarSessionStorage( resp.id, resp.user.id, resp.user, resp.user.companies, resp.refreshToken );

                return true;
              })
    )

            // })
            .pipe(
            catchError( err =>{
                // tslint:disable-next-line: deprecation
                Swal.fire({
                  title: 'Error en el login',
                  text: 'error al autenticar',
                  icon: 'error'
                });
                return Observable.throwError( err );
              })
            );




  }




   Autologin( usuario: Usuario) {

    let url = 'https://app-backanimo.atc-onlinead.com/autologin';
    return this.http.post( url, usuario )
    .pipe(

    map( (resp: any) =>{


                this.guardarSessionStorage(resp.id);


                return true;
              })
    )
  }









  logout(){

    this.token = '';
    this.refreshToken = '';
    this.usuario = null!;

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menus');
    localStorage.removeItem('empresas');
    localStorage.removeItem('empresaseleccionada');
    localStorage.removeItem('id');
    sessionStorage.removeItem('Id');
    this._router.navigate(['/auth/login']);

  }


crearUsuario( usuario: any){
  const url = this.URL_SERVICIOS  + '/auth_log/register';
  return this.http.post( url, usuario,  {headers: this.headers})
  .pipe(
  map( (resp: any) =>{

        Swal.fire({
          text: 'Usuario Creado',
          icon: 'success'
        });
        console.log('respuesta register', resp)
        return resp;

      })
  )
  .pipe(
  catchError( err =>{
        Swal.fire({
          text: 'El correo ya esta en uso',
          icon: 'warning'
        });
        console.log('error', err)
        return Observable.throwError( err );
      }));

}

actualizarUsuario( usuario: Usuario ){

  let url = this.URL_SERVICIOS + '/users/' + this.usuario.id;
  url += '?token=' + this.token;

  return this.http.put( url, usuario, {headers: this.headers})

  .pipe(
      map( (resp: any) =>{

        if ( usuario.id === this.usuario.id) {

          /* const usuarioDB: Usuario = resp.usuario;
          console.log('pass33', usuarioDB) */
           //this.guardarStorage( usuarioDB.id, this.token, usuarioDB,  this.menu, this.empresas);
          this.guardarStorage( this.token, usuario.id!, usuario, this.empresas, this.refreshToken);
        }
        Swal.fire({
          text: 'Usuario Actualizado',
          icon: 'success'
        });
        this._modalUploadServices.notificacion.emit( resp );
        return true

      }));


}



/* cambiarImagen( archivo: File, id: string ){

  //this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
  this._subirArchivoService.subirArchivo( archivo, 'usuario', id )

    .then( (resp: any) =>{
      this.usuario.img = resp.usuario.img;
      Swal.fire({
        text: 'Imagen Actualizada',
        icon: 'success'
      });
      //this.guardarStorage(id, this.token, this.usuario, this.menu, this.empresas);
       this.guardarStorage(id, this.token, this.usuario, this.empresas);


    })
    .catch( err =>{

    });
} */

cargarUsuarios( desde: number = 0){

  let url = this.URL_SERVICIOS + '/usuario?desde=' + desde;
  return this.http.get( url );


}

getAllUsers(){
  let url = this.URL_SERVICIOS + '/users';
  return this.http.get( url, {headers: this.headers} )
  .pipe(
       map( (resp: any) => {
        return resp;
      }));
}

getUsers( id: string ){
  let url = this.URL_SERVICIOS + '/users/' + id;

  this.headers = this.headers.set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  return this.http.get( url, {headers: this.headers} )
  .pipe(
      map( (resp: any ) => {

        return resp
      }));
}

buscarUsuarios( termino: string ) {

  let url = this.URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  return this.http.get( url )
  .pipe(
      map(( resp: any ) => resp.usuarios));
}

borrarUsuario( id: string ){

  let url = this.URL_SERVICIOS + '/usuario/' + id;
  url += '?token=' + this.token;

  return this.http.delete( url );

}

obtenerMenu( id: string ){

  let url = this.URL_SERVICIOS + '/menu/menuByUser/' + id;

    return this.http.get(url)
          .subscribe( (respm: any) => {

            this.menu = respm.menus;
            localStorage.setItem( 'menus', JSON.stringify(this.menu ));



            return true;
          });

          /* console.log('ruta',this.http.get( url ))*/



          //return respm;
        }


  registro(){

  }

}
