import { Component, OnInit, VERSION,ViewChild, ElementRef   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../../companies/components/modal-upload/modal-upload.service';
import { EmployeeService } from '../../services/employeeService.index';
import { Employee } from '../../models/employee.model';
import {MenuItem} from 'primeng/api';
//import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ModalUploadComponent } from '../../../companies/components/modal-upload/modal-upload.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  @ViewChild('scroller1') scroller!: ElementRef;

  items!: MenuItem[];
  activeItem!: MenuItem;
  scrollableItems!: MenuItem[];
  activeItem2!: MenuItem;

  version = 'Angular: v' + VERSION.full;

  employee: any = {};

  active = 1;

  @ViewChild('panel1') panel1!: HTMLElement;
  @ViewChild('panel2') panel2!: HTMLElement;
  @ViewChild('panel3') panel3!: HTMLElement;
  @ViewChild('panel4') panel4!: HTMLElement;
  @ViewChild('panel5') panel5!: HTMLElement;
  @ViewChild('panel6') panel6!: HTMLElement;
  @ViewChild('panel7') panel7!: HTMLElement;
  @ViewChild('panel8') panel8!: HTMLElement;
  @ViewChild('panel7') panel9!: HTMLElement;
  @ViewChild('panel8') panel10!: HTMLElement;


  constructor(private activatedRoute: ActivatedRoute,
              private _employeeService: EmployeeService,
              public _modalUploadServices: ModalUploadService,
              //public pageScrollServ: PageScrollService,
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

    /* this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    }); */

    window.scrollTo({ top: 40, behavior: 'smooth' });



  }

  /* onScroll(panel: HTMLElement, index: number): void {
    this.active = index;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const yOffset = -360; // Cambia este valor según la altura de tu header
    const y = panel.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
  } */


  onScroll(panel: HTMLElement, index: number): void {
    this.active = index;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const yOffset = -380; // Cambia este valor según la altura de tu header
    const y = panel.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
  }


  /* onScroll(target: HTMLElement, i: number) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.active = i;
    console.log('panel1',this.panel1.nativeElement);
    console.log('panel2',this.panel2.nativeElement);
  } */

  /* onScroll(event: HTMLElement, i:any) {
    this.pageScrollServ.scroll({
      scrollTarget: event,
      scrollOffset: 390,
      document: this.document
    });

    this.active = i;
  }*/

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
