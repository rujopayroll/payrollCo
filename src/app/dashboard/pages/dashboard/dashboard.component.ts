import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Period } from 'src/app/payroll/models/period.model';
import { PeriodService } from '../../../payroll/services/payrollService.index';
import { async } from 'rxjs';
import { getSafePropertyAccessString } from '@angular/compiler';




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
  texto = "";
  ahora = new Date();



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

  greeting (): void{
    var hours = this.ahora.getHours();

    if (hours >= 6 && hours < 13) {
      this.texto = "Buenos días";

    }
    if (hours >= 13 && hours < 19) {
      this.texto = "Buenas tardes";

    }
    if (hours >= 19 || hours < 6) {
      this.texto = "Buenas noches";

    }

  }


  ngOnInit(): void {

    this.getPeriodByProcess( this.empresa.id );
    this.greeting();
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

        .subscribe((periodCreated: any) => {
          console.log('entro a crear el periodo', periodCreated)
        })

  }









}


