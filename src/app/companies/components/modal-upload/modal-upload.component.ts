import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

import { SubirArchivoService } from '../../../employees/services/employeeService.index';
import { ModalUploadService } from './modal-upload.service';
import { CompanyService } from '../../services/company/company.service';
import { AuthService } from '../../../auth/services/authservice.index';

import { Company } from '../../models/company.model';
import { Subscriber } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public company: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  file!: File;
  displayModal!: boolean;
  //usuario: Usuario;
  imagenSubir!: File | any;
  @Input() imagenS: any;
  imagenTemp!: string | ArrayBuffer | any;

  @Output() public imagenSelect: EventEmitter<any> =  new EventEmitter();
  


  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService,
               public _companyService: CompanyService,
               public _usuarioService: AuthService,) { 

                this.imagenSelect = new EventEmitter();

                this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
                
            
                if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                 
                  
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                }

               
                this.displayModal = this._modalUploadService.modal

               }

  ngOnInit(): void {
    this.displayModal=true
  }

  verImagen(){

    // this.router.navigate( ['/employee',this.index] );
   this.imagenSelect.emit({imagenS: this.imagenSubir});
  }
 
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.file.name.slice;
    this._modalUploadService.ocultarModal();
    
  }

  seleccionImagen( archivo: File ): void{

    if ( !archivo ){
        this.imagenSubir = null;
        return;
    }

    if ( archivo.type.indexOf('image') < 0 ){
      Swal.fire({
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL ( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;


  }

  onUpload(event: any) {
  
    this.file = event.files[0];
    this.imagenSubir = this.file;
  }
  

  subirImagen(){
    console.log('entro a subir imagen')
    if (this._modalUploadService.tipo === 'employee') {

      this._subirArchivoService.subirArchivoEmployee( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then( resp => {
      
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
        
      
      })
      .catch(resp => {
      
        console.log('Error en la carga')
      });
    
    }else {
        this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this.empresa.id)
        .then( resp => {
      
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        
        })
        .catch(resp => {
        
          console.log('Error en la carga')
        });
      }
    
  
  }

 




}
 

