import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';
import { EmployeeService } from '../../services/employeeService.index';
import { Employee } from '../../models/employee.model';
import {MenuItem} from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;
  active = 1;
  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;

  version = 'Angular: v' + VERSION.full;

  employee: any = {};
  


  constructor(private activatedRoute: ActivatedRoute,
              private _employeeService: EmployeeService,
              public _modalUploadServices: ModalUploadService,
              public pageScrollServ: PageScrollService,
              @Inject(DOCUMENT) private document: any
              ) { 

                this.activatedRoute.params.subscribe( params =>{
                  this.cargarEmployees( params[ 'id' ]);
              });
              }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe( params =>{
      this._modalUploadServices.notificacion
      .subscribe( () =>  this.cargarEmployees( params[ 'id' ]));
    });

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

   
    
  }

  onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 350,
      document: this.document
    });

    this.active = i;
  } 

  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          this.employee = employee;
        });

  }

  actualizarImagen( employee: Employee ){
  
    this._modalUploadServices.mostrarModal('employee', employee.id! );
    
  }



  

  

}
