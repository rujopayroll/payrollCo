import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Period } from 'src/app/payroll/models/period.model';
import { PeriodService } from '../../../payroll/services/payrollService.index';
import { async } from 'rxjs';
import { getSafePropertyAccessString } from '@angular/compiler';
import { CardModule } from 'primeng/card';
import { CompanyService } from '../../../companies/services/company/company.service';
import { Usuario } from '../../../auth/models/usuario.model';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  visibleSidebar2: any;
  empresaseleccionada: any = {};
  //usuario: any = {};
  period: any ={};
  empresa: any = {};
  company: any;
  yearPeriod!: number;
  Date = new Date();
  texto = "";
  ahora = new Date();
  companyUser: any[]=[]
  usuario!: Usuario;






  constructor( public _periodService: PeriodService,
               public _usuarioService: AuthService,
               public _companyService: CompanyService,
               public router: Router) {


//SOLO SE COMENTO PARA EDITAR EL DASHBOARD.....
    //this.company = this._usuarioService.empresas;
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
    //this.usuario = JSON.parse(localStorage.getItem('usuario')!);

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

    /* this.getPeriodByProcess( this.empresa.id ) */


  }


   getPeriodByProcess( id: string ) {

     this._periodService.getPeriodByCompanyByProcess( id )
        .subscribe ( (period: any) => {

          if (period && Array.isArray(period.data)) {
            console.log('periodo',period)
            this.period = period.data[0];
            console.log('periodo2', this.period)
          }else{
            this.createdPeriod(this.empresa.id, this.yearPeriod = new Date().getFullYear())
          }
        },
        (error) => {
          console.error('Error al cargar periodo en proceso', error);
          this.period = []; // Manejo de error para evitar undefined
        }

        );
  }

  createdPeriod(id: string, year:number) {
    this._periodService.createPeriod(id, year)

        .subscribe((periodCreated: any) => {
          console.log('entro a crear el periodo', periodCreated)
        })

  }


  cargarEmpresasUsuario(iduser: string){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( companyUser => {
      this.companyUser = companyUser.companies
      this.usuario = companyUser.user
    });
  }






}


