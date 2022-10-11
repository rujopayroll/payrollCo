import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Period } from 'src/app/payroll/models/period.model';
import { PeriodService } from '../../../payroll/services/payrollService.index';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  visibleSidebar2: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  period: any =[0];
  empresa: any = {};
  company: any;
  yearPeriod!: number;
  Date = new Date();

  constructor( public _periodService: PeriodService,
               public _usuarioService: AuthService,
               public router: Router) { 


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

    
     this.createdPeriod(this.empresa.id, this.yearPeriod = new Date().getFullYear()) 
   
     
    
  }

 
  ngOnInit(): void {

    this.getPeriodByProcess( this.empresa.id )
    
    console.log(this.period[0].year, 'init')
    /* this.getPeriodByProcess( this.empresa.id ) */
    
  
  }

  
   getPeriodByProcess( id: string ) {

    /* let variable = await this._periodService.getPeriodByCompanyByProcess( id ) */
    
     this._periodService.getPeriodByCompanyByProcess( id )
        .subscribe ( (period: any) => {
          this.period[0] = period[0];
          console.log(this.period[0].year)
        }); 

        
        

  }

  createdPeriod(id: string, year:number) {
    this._periodService.createPeriod(id, year)
        .subscribe((periodCreated: any) => {})
  }

  

}
