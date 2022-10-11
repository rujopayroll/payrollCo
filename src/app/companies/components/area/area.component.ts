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


      this.cargarArea( this.empresa.id );
      this.cargarCompanySelect( this.empresa.id );
      this.crearFormulario();
     }

    
    get descripcionNoValido(){return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched}
    get estadoNoValido(){return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched}
     
    

  ngOnInit(): void {
    
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
          .subscribe( () => this.cargarArea(this.empresa.id));
          this.new = false;
          this.areaDialog = false;
         
        } else {
  
    const area = new Area(
     
      this.forma.value.descripcion,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._areaService.crearArea( area )
  .subscribe( resp => {
    this.areaDialog = false;
    
    this.cargarArea( this.empresa.id );
    
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
    this.areas.isActive="true";
    this.submitted = false;
    this.areaDialog = true;
    this.new= true;
}


editArea(area: Area) {
    this.areas = {...area};
    this.areaDialog = true;
    this.new= false;
}


  cargarArea( id: string ) {
    this._areaService.cargarArea( id )
        .subscribe( area => {
          this.area = area;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarArea( termino: string){

    if ( termino.length <= 0 ){
      this.cargarArea(termino);
      return;
    }

    this._areaService.buscarArea( termino )
        .subscribe( resp => this.area = resp );
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
  

}