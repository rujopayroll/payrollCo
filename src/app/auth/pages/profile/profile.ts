import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;


  constructor( public _usuarioService: AuthService) {

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario ){

    this.usuario.name = usuario.name;
    this.usuario.userName = usuario.userName;

    this._usuarioService.actualizarUsuario( this.usuario)
        .subscribe();

  }

  seleccionImagen( archivo: File ){

    if ( !archivo ){
        //this.imagenSubir = null;
        return;
    }

    if ( archivo.type.indexOf('image') < 0 ){
      Swal.fire({
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      //this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL ( archivo );

    //reader.onloadend = () => this.imagenTemp = reader.result;


  }

  /* cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario.id);
  } */

}
