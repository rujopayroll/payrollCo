import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService, AreaService } from '../../services/companyService.index';
import {MenuItem} from 'primeng/api';
import { Area } from '../../models/area.model';
import { Company } from '../../models/company.model';
import { AuthService } from '../../../auth/services/authservice.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

declare var $: any;



@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  providers: [MessageService,ConfirmationService],
  styles: []
})

export class AreaComponent implements OnInit {


  public date: Date = new Date();
  forma!: UntypedFormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};

  isActive = true;
  area: any = {};
  areas: any= {};
  selectedArea: any = [];
  areaDialog!: boolean;
  submitted!: boolean;
  new!: boolean;
  user!: string;
  companyUser: any = {};
  empresa_id: string = '';
  registro: any = {};
  // costCenter: CostCenter = new CostCenter('', '', '', '', '', '', true, this.date, this.date, '');


  constructor(private fb: UntypedFormBuilder,
              public _areaService: AreaService  ,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: AuthService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) {

      //this.company = this._usuarioService.empresas;
      //this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
      this.user = localStorage.getItem('id')!;
    this.cargarEmpresasUsuario(this.user)
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);

     /*  if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                } */



     }


    get descripcionNoValido(){return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched}
    get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}



  ngOnInit(): void {
    this.user = localStorage.getItem('id')!;
    this.cargarEmpresasUsuario(this.user)
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
            this._areaService.actualizarArea( this.areas )
          .subscribe( () => this.cargarArea(this.empresa_id));
          this.new = false;
          this.areaDialog = false;

        } else {

 /*    const area = new Area(

      this.forma.value.descripcion,
      this.empresa_id,
      this.forma.value.estado,
      this.user
  ); */

  let form = [
    {

      description:this.forma.value.descripcion,
      companyId:this.empresa_id,
      isActive:this.forma.value.estado,
      createdUser:this.user

    }
  ]
  this.registro =  JSON.parse(JSON.stringify(form[0]));


    this._areaService.crearArea( this.registro )
  .subscribe( (resp: any) => {
    this.areaDialog = false;

    this.cargarArea( this.empresa_id );

  });

    this.forma.reset();
    this.crearFormulario();

  }
});
  }


  hideDialog() {
    this.areaDialog = false;
    this.submitted = false;
}

openNewArea() {
    this.areas! = {};
    this.areas.isActive=true;
    this.submitted = false;
    this.areaDialog = true;
    this.new= true;
}


/* editArea(area: Area) {
    this.areas = {...area};
    this.areaDialog = true;
    this.new= false;
} */

editArea(area: Area) {
  this.areas = {
    id: area.id,
    description: area.description,
    companyId: area.company_id,
    isActive: area.isActive,
    updateUser: this.user
  }
  this.areaDialog = true;
  this.new= false;
}








  cargarArea( id: string ) {
    this._areaService.cargarArea( id )
        .subscribe( (area: any) => {

          this.area =  Array.isArray(area.data) ? area.data : [area.data];
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( (company: any) => {
          this.company = Array.isArray(company) ? company: [company];
        });

  }

  buscarArea( termino: string){

    if ( termino.length <= 0 ){
      this.cargarArea(termino);
      return;
    }

    this._areaService.buscarArea( termino )
        .subscribe( (resp: any) => this.area = resp );
}


  guardarArea( area: Area){

    this._areaService.actualizarArea( area )

          .subscribe( () => this.cargarArea(this.empresa.id));
  }

  deleteArea( area: Area ){



    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar el Área' + ' ' + area.description + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Si",
      rejectLabel:"No",
      accept: () => {

        this._areaService.borrarArea( area.id! )
        .subscribe ( () => this.cargarArea(this.empresa.id));



          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
      }
  });




  }

  cargarEmpresasUsuario(iduser: any) {
    this._companyService.cargarCompanysUser(iduser).subscribe(
      (resp: any) => {
        if (resp && resp.companies) {

          this.companyUser = resp.companies;

          this.usuario = resp.user;

          if(this.companyUser.length > 1 ){
            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
            this.empresa_id = this.empresa.id
            this.cargarArea( this.empresa_id );
            this.cargarCompanySelect( this.empresa_id );

          }else{
            this.empresa =  this.companyUser[0];
            this.empresa_id = this.empresa.id
            this.cargarArea( this.empresa_id );
            this.cargarCompanySelect( this.empresa_id );


          }

        } else {
          this.companyUser = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
        }

        this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
      },
      (error) => {
        console.error('Error al cargar las empresas:', error);
        this.companyUser  = { companies: [] }; // En caso de error, aseguramos que no falle
      }
    );
  }

}
