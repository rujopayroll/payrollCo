import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalUploadService } from 'src/app/companies/components/modal-upload/modal-upload.service';
import { EmployeeJobService } from '../../services/employeeService.index';
import { CostCenterService } from '../../../companies/services/costCenter/cost-center.service';
import { AreaService } from '../../../companies/services/area/area.service';
import { PositionService } from '../../../companies/services/position/position.service';
import { SubsidiaryService } from '../../../companies/services/subsidiary/subsidiary.service';
import { AuthService } from '../../../auth/services/authservice.index';
import { EmployeeJob } from '../../models/employeeJob.model';
import { CostCenter } from '../../../companies/models/costCenter.model';
import { Area } from '../../../companies/models/area.model';
import { Position } from '../../../companies/models/position.model';
import { Subsidiary } from '../../../companies/models/subsidiary.model';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-jobEmployee',
  templateUrl: './jobEmployee.component.html',
  styleUrls: ['./jobEmployee.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class JobEmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  forma!: UntypedFormGroup;
  public date: Date = new Date();
  active = 1;
  isActive = true;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;
  costCenter: any = {};
  area: any = {};
  position: any = {};
  subsidiary: any = {};
  empresaseleccionada: any = {};
  public company: any = {};
  public employeeJ: any = {};
  empresa: any = {};
  usuario: any = {};
  version = 'Angular: v' + VERSION.full;
  registro: any = {};
  submitted!: boolean;
  new!: boolean;
  jobEmployeeDialog!: boolean;
  employeesJobs: any= {};
  employeesJob: any= {};
  costCenters: CostCenter[] = [];
  areas: Area[]=[];
  positions: Position[]=[];
  subsidiarys: Subsidiary[]=[];
  employeeJob: EmployeeJob = new EmployeeJob('', '', true, '', '', '', '', this.date, this.date, '');


  constructor(
              private fb: UntypedFormBuilder,
              public _router: Router,
              public _usuarioService: AuthService,
              public activatedRoute: ActivatedRoute,
              public _employeeJobService: EmployeeJobService,
              public _modalUploadServices: ModalUploadService,
              public _costCenterService: CostCenterService,
              public _areaService: AreaService,
              public _positionService: PositionService,
              public _subsidiaryService: SubsidiaryService,
              public pageScrollServ: PageScrollService,
              @Inject(DOCUMENT) private document: any
              ) { 

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

                 this.usuario = JSON.parse(localStorage.getItem('usuario')!);

                 this.activatedRoute.params.subscribe( params =>{
                  this.cargarEmployeesJob( params[ 'id' ]);
              }); 
              this.crearFormulario();

              }

  ngOnInit(): void {


    this.getAllArea(this.empresa.id);
    this.getAllCostCenter(this.empresa.id);
    this.getAllPosition(this.empresa.id);
    this.getAllSubsidiary(this.empresa.id);

    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployeesJob( params[ 'id' ]));
    });

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

   
    
  }

  get costCenterNoValido(){return this.forma.get('costCenter')!.invalid && this.forma.get('costCenter')!.touched}
  get areaNoValido(){return this.forma.get('area')!.invalid && this.forma.get('area')!.touched}
  get subsidiaryNoValido(){return this.forma.get('subsidiary')!.invalid && this.forma.get('subsidiary')!.touched}
  get positionNoValido(){return this.forma.get('position')!.invalid && this.forma.get('position')!.touched}
  

  crearFormulario(){

    this.forma = this.fb.group({
     
      costCenter       : ['', Validators.required],
      area:  ['', Validators.required],
      subsidiary    : ['', Validators.required],
      position : ['', Validators.required]
     });
    }

    guardar(jobEmployee: EmployeeJob){

      if (this.forma.invalid){
    
        
    
        return Object.values (this.forma.controls).forEach( control =>{
    
          if (control instanceof UntypedFormGroup) {
            Object.values (control.controls).forEach( control => control.markAsTouched());
    
          } else{
            control.markAsTouched();
          }
          
    
        });
      }
  
    
      this.activatedRoute.params.subscribe( params => {
        const id = params[ 'id' ];
    
  
      let form = [
        {
    
          updateUser: this.usuario,
          isActive: this.isActive,
          id: id,
          costCenter_id: this.forma.value.costCenter,
          area_id: this.forma.value.area,
          subsidiary_id: this.forma.value.subsidiary,
          position_id: this.forma.value.position
         
  
        }
      ]
   
    
      this.registro =  JSON.parse(JSON.stringify(form[0]));
      
  
      this._employeeJobService.actualizarEmployeeJob( this.employeeJ )
              .subscribe( () => this.cargarEmployeesJob(this.employeeJ.id));
              this.jobEmployeeDialog = false;
      
      
    
      // this.forma.reset();
    }) 
    }

  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 300,
      document: this.document
    });

    this.active = i;
  } 

  hideDialog() {
    this.jobEmployeeDialog = false;
    this.submitted = false;
}

editJobEmployee(jobEmployee: EmployeeJob) {
  this.employeesJobs = {...jobEmployee};
  this.jobEmployeeDialog = true;
  this.new= false;
}

  cargarEmployeesJob( id: string ) {
    this._employeeJobService.cargarEmployeeJob( id )
        .subscribe( employeeJob => {
        this.employeeJ = employeeJob[0];
        if (this.employeeJ) {
          this.getCostCenter( this.employeeJ.costCenter_id );
          this.getArea( this.employeeJ.area_id );
          this.getPosition( this.employeeJ.position_id );
          this.getSubsidiary( this.employeeJ.subsidiary_id );
        } 
        });

  }


  getCostCenter( id: string)  {
    this._costCenterService.obtenerCostCenter( id )
        .subscribe( costCenter => {
          this.costCenter = costCenter;
  });
  }

  getAllCostCenter(company: string)  {
    this._costCenterService.cargarCostCenterCompanyActive( company )
        .subscribe( costCenter => {
          this.costCenters = costCenter;
  });
  }
  
  getArea( id: string)  {
    this._areaService.obtenerArea( id )
        .subscribe( area => {
          this.area = area;
  });
  }

  getAllArea( company: string)  {
    this._areaService.cargarAreaCompanyActive( company)
        .subscribe( area => {
          this.areas = area;
  });
  }
  
  getPosition( id: string)  {
    this._positionService.obtenerPosition( id )
        .subscribe( position => {
          this.position = position;
  });
  }

  getAllPosition( company: string)  {
    this._positionService.cargarPositionCompanyActive( company )
        .subscribe( position => {
          this.positions = position;
  });
  }
  
  getSubsidiary( id: string)  {
    this._subsidiaryService.obtenerSubsidiary( id )
        .subscribe( subsidiary => {
          this.subsidiary = subsidiary;
  });
  }
  
  getAllSubsidiary( company: string)  {
    this._subsidiaryService.cargarSubsidiaryCompanyActive( company )
        .subscribe( subsidiary => {
          this.subsidiarys = subsidiary;
  });
  }
  
  
}