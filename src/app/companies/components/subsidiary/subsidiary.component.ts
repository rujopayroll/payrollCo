import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService, SubsidiaryService } from '../../services/companyService.index';
import { Subsidiary } from '../../models/subsidiary.model';
import { Company } from '../../models/company.model';
import { AuthService } from '../../../auth/services/authservice.index';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
//import { Usuario } from '../../models/usuario.model';

declare var $: any;


@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.component.html',
  styleUrls: ['./subsidiary.component.scss'],
  providers: [MessageService,ConfirmationService],
  styles: []
})

export class SubsidiaryComponent implements OnInit {

  
  public date: Date = new Date();
  forma!: UntypedFormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  
  isActive = true;
  subsidiary: Company[] = [];
  subsidiaries: any= {};
  selectedSubsidiary: any = [];
  subsidiaryDialog!: boolean;
  submitted!: boolean;
  new!: boolean;
  
 

  constructor(private fb: UntypedFormBuilder,
    
              public _subsidiaryService: SubsidiaryService  ,
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


      this.cargarSubsidiary( this.empresa.id );
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


  hideDialog() {
    this.subsidiaryDialog = false;
    this.submitted = false;
}

openNewSubsidiary() {
    this.subsidiaries! = {};
    this.subsidiaries.isActive="true"
    this.submitted = false;
    this.subsidiaryDialog = true;
    this.new= true;
}


editSubsidiary(subsidiary: Subsidiary) {
    this.subsidiaries = {...subsidiary};
    this.subsidiaryDialog = true;
    this.new= false;
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
            this._subsidiaryService.actualizarSubsidiary( this.subsidiaries )
          .subscribe( () => this.cargarSubsidiary(this.empresa.id));
          this.new = false;
          this.subsidiaryDialog = false;
         
        } else {
  
    const subsidiary = new Subsidiary(
     
      this.forma.value.descripcion,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._subsidiaryService.crearSubsidiary( subsidiary )
  .subscribe( resp => {
    this.subsidiaryDialog = false
    this.new = false;
    this.cargarSubsidiary( this.empresa.id );
    
  });

    this.forma.reset();
    this.crearFormulario();

  }
});
  }



  cargarSubsidiary( id: string ) {
    this._subsidiaryService.cargarSubsidiary( id )
        .subscribe( subsidiary => {
          this.subsidiary = subsidiary;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarSubsidiary( termino: string){

    if ( termino.length <= 0 ){
      this.cargarSubsidiary(termino);
      return;
    }

    this._subsidiaryService.buscarSubsidiary( termino )
        .subscribe( resp => this.subsidiary = resp );
}


  guardarSubsidiary( subsidiary: Subsidiary){

    this._subsidiaryService.actualizarSubsidiary( subsidiary )
    
          .subscribe( () => this.cargarSubsidiary(this.empresa.id));
  }
  
  deleteSubsidiary( subsidiary: Subsidiary ){


    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar la Sucursal' + ' ' + subsidiary.description + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Si",
      rejectLabel:"No",
      accept: () => {
          
        this._subsidiaryService.borrarSubsidiary( subsidiary.id! )
        .subscribe ( () => this.cargarSubsidiary(this.empresa.id));
          
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Centro de costo Eliminado', life: 3000});
      }
  });
  
   
  
  }
  

}