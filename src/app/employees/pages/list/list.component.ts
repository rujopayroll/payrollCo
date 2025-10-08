import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../../companies/services/company/company.service';
import { Company } from '../../../companies/models/company.model';

import {SelectItem } from 'primeng/api';
//import { Product } from 'src/app/companies/interfaces/producinterface';
//import { ProductService } from 'src/app/companies/services/producto/productservice';
import { EmployeeService } from '../../services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../models/employee.model';
import { EmployeeContract } from '../../models/employeeContract.model';
import { EmployeeContractService } from '../../services/employeeService.index';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  first: number = 0;

  rows: number = 10;
  idUser: any;
  employees: Employee[] = [];
  employeeContract: EmployeeContract []= [];

  busqueda = '';
  company: any = {};
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  desde = 0;
  totalRegistros = 0;
  loading = false;
  layout: 'list' | 'grid' = 'grid';
  sortField = 'nombre';
  sortOrder: 1 | -1 = 1;
  query = '';

  constructor( public _employeeService:EmployeeService,
              public _employeeContract: EmployeeContractService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _companyService: CompanyService,
                ) {


                //this.company = this._usuarioService.empresas;
                //this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
                this.idUser = localStorage.getItem('id')!;
                this.usuario = JSON.parse(localStorage.getItem('usuario')!);
                this.cargarEmpresasUsuario(this.idUser )

                /* if ( this.empresaseleccionada ){
                            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                          } else {
                            if(this.company.length > 1 ) {
                              this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                            } else {
                              this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                            }
                          } */




               }



  ngOnInit(){

    this.fetch();
  }

  veremployee( idx: number ){

    this.router.navigate( ['/employees/', idx] );

  }

  searchemployee( termino: string ) {

  }

  getEmployees( id: string ) {

    this._employeeService.cargarEmployeeCompany( id)
        .subscribe( (employee: any) => {
          this.totalRegistros = employee.total;
          this.employees = employee;

        });

  }

  getEmployeesContract( id: string ) {
    this._employeeContract.cargarEmployeeContract( id )
        .subscribe( employeeContract => {

          this.employeeContract = employeeContract;
          /* if (this.employeeContract){
            this.obtenerContractType();

          } */
        });
  }

 /*  newemployee(){

    this.router.navigate( ['/employees/new'] );
  } */


  buscarEmployees( termino: string){

    if ( termino.length <= 0 ){

      this.getEmployees( this.empresa.id);
      return;
    }

    this._employeeService.buscarEmployees( termino )
        .subscribe( resp => {
          console.log('termino', termino)
          this.employees = resp.data
        });
}


onPageChange(event: PageEvent) {
  this.first = event.first;
  this.rows = event.rows;
}


cargarEmpresasUsuario(iduser: any) {
  this._companyService.cargarCompanysUser(iduser).subscribe(
    (resp: any) => {
      if (resp && resp.companies) {

        this.company = resp.companies;

        this.usuario = resp.user;

        if(this.company .length > 1 ){
          this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
          this.getEmployees( this.empresa.id );

        }else{
          this.empresa =  this.company[0];
          this.getEmployees( this.empresa.id );
        }

      } else {
        this.company  = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
      }

      this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
    },
    (error) => {
      console.error('Error al cargar las empresas:', error);
      this.company  = { companies: [] }; // En caso de error, aseguramos que no falle
    }
  );
}


// nuevo validar

areas = [{label:'Todos', value:null},{label:'Payroll', value:'Payroll'},{label:'EC', value:'EC'}];
sedes = [{label:'Todas', value:null},{label:'Bogotá', value:'BOG'},{label:'Medellín', value:'MED'}];

empleados = [
  { nombre:'Pedro Porras', stack:'SAP HCM | Payroll | EC', documento:'1010101' },
  // ...
];
total = 9;
/* query = ''; area=null; sede=null; */

onSearch(q:string){ /* filtra servidor o cliente */ }

getIni(n:string){ return (n||'?').slice(0,1).toUpperCase(); }
nuevo(){/* ... */} importar(){/* ... */} exportar(){/* ... */} acciones(e:any){/* ... */}


fetch(page = 0) {
  this.loading = true;
  // this.api.getEmpleados(page).subscribe({
  //   next: r => { this.empleados = r.items; this.total = r.total; },
  //   error: _ => {},
  //   complete: () => this.loading = false
  // });
  setTimeout(() => { this.empleados = []; this.loading = false; }, 500); // mock
}

onPage(e: any) { this.fetch(e.page); }

toggleLayout(next: 'list' | 'grid') { this.layout = next; }


editar(e:any){ console.log('Editar', e); }
ver(e:any){ console.log('Ver', e); }
retirar(e:any){ console.log('Retirar', e); }

}


