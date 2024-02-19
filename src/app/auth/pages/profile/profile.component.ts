import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


 formaProfile!: FormGroup;
  usuario: Usuario;
  imagenSubir!: File;
  imagenTemp!: string | ArrayBuffer;
  user: any = {};




  constructor( public _usuarioService: AuthService,
               private activatedRoute: ActivatedRoute,
               private fb: FormBuilder,
               public _modalUploadServices: ModalUploadService,
               @Inject(DOCUMENT) private document: any ) {

    this.usuario = this._usuarioService.usuario;
    this.getUsers(this.usuario.id!)
    this._modalUploadServices.notificacion

  }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this.getUsers(this.usuario.id!)

     this._modalUploadServices.notificacion
    .subscribe( () => this.getUsers(this.usuario.id!));


  }

  get nombreNoValido(){return this.formaProfile.get('name')!.invalid && this.formaProfile.get('name')!.touched }
  get correoNoValido(){return this.formaProfile.get('email')!.invalid && this.formaProfile.get('email')!.touched }

  crearFormulario(){

    this.formaProfile = this.fb.group({
     name       : ['', [Validators.required]],
     email       : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
   });
   }

  guardar(user: Usuario ){
console.log('entro',user)

    /* this.usuario.name = user.name;
    this.usuario.userName = user.userName; */

    this._usuarioService.actualizarUsuario( user)
        .subscribe( resp =>{
          this._modalUploadServices.notificacion.emit( resp );
        });

  }





  registrarUsuario(){

  }

  campoEsValido( campo: string){
    return this.formaProfile.controls[campo].errors
        && this.formaProfile.controls[campo].touched
  }


  actualizarImagen( usuario: Usuario ){

      this._modalUploadServices.mostrarModal('user', usuario.id! );




  }

  getAllUsers() {
    this._usuarioService.getAllUsers( )
        .subscribe( user => {
          this.user = user
        });

  }

  getUsers(id: string) {
    this._usuarioService.getUsers( id )
        .subscribe( user => {

          this.user = user
        });

  }

}
