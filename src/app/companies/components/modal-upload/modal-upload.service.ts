import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo!: string;
  public id!: string;
  public oculto: string = 'oculto';
  public modal!: boolean;

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.oculto! = 'oculto';
    this.tipo = null!;
    this.id = null!;
    this.modal = false;
  }

  mostrarModal( tipo: string, id: string | any ){
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
    this.modal = true;
  }
}
