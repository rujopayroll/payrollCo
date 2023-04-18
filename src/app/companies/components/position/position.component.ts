import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService, PositionService } from '../../services/companyService.index';
import { Position } from '../../models/position.model';
import { Company } from '../../models/company.model';
import { AuthService } from '../../../auth/services/authservice.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
//import { Usuario } from '../../models/usuario.model';

declare var $: any;



@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [MessageService,ConfirmationService],
  styles: []
})

export class PositionComponent implements OnInit {


  public date: Date = new Date();
  forma!: UntypedFormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};

  isActive = true;
  position: any = {};
  positions: any= {};
  selectedPosition: any = [];
  positionDialog!: boolean;
  submitted!: boolean;
  new!: boolean;




  constructor(private fb: UntypedFormBuilder,

              public _positionService: PositionService  ,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: AuthService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) {

      this.company = this._usuarioService.empresas;
      this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);

      if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                }



     }


    get descripcionNoValido(){return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched}
    get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}


  ngOnInit(): void {
    this.cargarPosition( this.empresa.id );
      this.cargarCompanySelect( this.empresa.id );

      this.crearFormulario();

  }



  crearFormulario(){
    this.forma = this.fb.group({
      descripcion: ['', Validators.required],
      estado    : ['true']
      });

  }



  guardar(){

    if (this.forma.invalid){



      return Object.values (this.forma.controls).forEach( control =>{

        if (control instanceof UntypedFormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());

        } else{
          control.markAsTouched();
        }


      });
    }

    this._activatedRoute.params.subscribe( params => {
        const id = params['id'];
        if ( this.new !== true) {
            this._positionService.actualizarPosition( this.positions )
          .subscribe( () => this.cargarPosition(this.empresa.id));
          this.new = false;
          this.positionDialog = false;

        } else {

    const position = new Position(

      this.forma.value.descripcion,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._positionService.crearPosition( position )
  .subscribe( resp => {
   this.positionDialog = false

    this.cargarPosition( this.empresa.id );

  });

    this.forma.reset();
    this.crearFormulario();

  }
});
}

hideDialog() {
    this.positionDialog = false;
    this.submitted = false;
}

openNewPosition() {
    this.positions! = {};
    this.positions.isActive="true"
    this.submitted = false;
    this.positionDialog = true;
    this.new= true;
}


editPosition(position: Position) {
    this.positions = {...position};
    this.positionDialog = true;
    this.new= false;
}

  cargarPosition( id: string ) {
    this._positionService.cargarPosition( id )
        .subscribe( position => {
          this.position = position;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarPosition( termino: string){

    if ( termino.length <= 0 ){
      this.cargarPosition(termino);
      return;
    }

    this._positionService.buscarPosition( termino )
        .subscribe( resp => this.position = resp );
}


  guardarPosition( position: Position){

    this._positionService.actualizarPosition( position )

          .subscribe( () => this.cargarPosition(this.empresa.id));
  }

  deletePosition(position: Position){



    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar el cargo' + ' ' + position.description + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"Si",
        rejectLabel:"No",
        accept: () => {


            this._positionService.borrarPosition(position.id! )
            .subscribe ( () => this.cargarPosition(this.empresa.id));


            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
        }
    });




  }


}
