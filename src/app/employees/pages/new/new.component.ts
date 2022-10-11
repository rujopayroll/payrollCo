import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef  } from '@angular/core';
import { CompanyService } from '../../../companies/services/companyService.index';
import { Company } from '../../../companies/models/company.model';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import {SelectItem } from 'primeng/api';
import { Product } from 'src/app/companies/interfaces/producinterface';
import { ProductService } from 'src/app/companies/services/producto/productservice';
import { EmployeeService } from '../../services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../models/employee.model';
import { EmployeeContract } from '../../models/employeeContract.model';
import { EmployeeContractService, EmployeeNewService } from '../../services/employeeService.index';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PageScrollService } from 'ngx-page-scroll-core';


import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [MessageService],
  
encapsulation: ViewEncapsulation.None
})
export class NewComponent implements OnInit {

 
  @ViewChild('scroller1') scroller!: ElementRef;
  employees: Employee[] = [];
  employeeContract: EmployeeContract []= [];
  
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  desde = 0;
  totalRegistros = 0;
  items!: MenuItem[];
  active = 1;
  subscription!: Subscription;

  constructor( public _employeeService:EmployeeService,
              public _employeeContract: EmployeeContractService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public messageService: MessageService,
               public _employeeNewService: EmployeeNewService,
               public pageScrollServ: PageScrollService,
               @Inject(DOCUMENT) private document: any
                ) { 


                this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
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


               
  ngOnInit(){ 

    this.pageScrollServ.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    }); 


    this.items = [{
        label: 'Inf. Personal',
        routerLink: '/employees/new/personal'
    },
    {
        label: 'Info. Laboral',
        routerLink: '/employees/new/working'
    },
    {
        label: 'Contrato',
        routerLink: '/employees/new/contract'
    },
    {
        label: 'Inf. Salarial',
        routerLink: '/employees/new/salary'
    },
    {
        label: 'Inf. del Puesto',
        routerLink: '/employees/new/job'
    },
    {
        label: 'Forma de Pago',
        routerLink: '/employees/new/payment'
    },
    {
        label: 'Seg. Social',
        routerLink: '/employees/new/socialSecurity'
    },
    
    {
        label: 'Confirmación',
        routerLink: '/employees/new/confirmation'
    }

];

this.subscription = this._employeeNewService.socialSecurityComplete$.subscribe((personalInformation) =>{


  console.log('entro al guardar')

    this.messageService.add({severity:'success', summary:'Creación de Empleados', detail: 'El Empleado (a), ' + personalInformation.pnombre + ' ' + personalInformation.papellido + ' ha siso creado con éxito.'})
  
});

/* this.router.navigate(['/employees/list/']); */
 
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}


onScroll(event: HTMLElement) {
  this.pageScrollServ.scroll({
    scrollTarget: event,
    scrollOffset: 1000,
    document: this.document
  });

}

  


  
}
