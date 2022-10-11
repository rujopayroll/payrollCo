import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../companies/services/companyService.index';
import { Company } from '../../../companies/models/company.model';

import {SelectItem } from 'primeng/api';
import { Product } from 'src/app/companies/interfaces/producinterface';
import { ProductService } from 'src/app/companies/services/producto/productservice';
import { EmployeeService } from '../../services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../models/employee.model';
import { EmployeeContract } from '../../models/employeeContract.model';
import { EmployeeContractService } from '../../services/employeeService.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

 

  employees: Employee[] = [];
  employeeContract: EmployeeContract []= [];
  
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  desde = 0;
  totalRegistros = 0;

  constructor( public _employeeService:EmployeeService,
              public _employeeContract: EmployeeContractService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService
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

                          
                          this.getEmployees( this.empresa.id );

               }


               
  ngOnInit(){ }

  veremployee( idx: number ){
  
    this.router.navigate( ['/employees/', idx] );
    
  }

  searchemployee( termino: string ) {

  }

  getEmployees( id: string ) {
    
    this._employeeService.cargarEmployeeCompany( id)
        .subscribe( (employee: any) => {
          this.totalRegistros = employee.length;
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
          this.employees = resp 
        });
}

  
}


