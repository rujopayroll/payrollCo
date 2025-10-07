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
import { isPlatformBrowser } from '@angular/common';

// import { AppConfigService } from '@/service/appconfigservice';
import { ChartModule } from 'primeng/chart';




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
  companyUser: any = {};
  usuario!: Usuario;
  user!: string;
  //grafica
  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  //configService = inject(AppConfigService);

  //designerService = inject(DesignerService);


  //fin grafica






  constructor( public _periodService: PeriodService,
               public _usuarioService: AuthService,
               public _companyService: CompanyService,
               public router: Router, private cd: ChangeDetectorRef) {


//SOLO SE COMENTO PARA EDITAR EL DASHBOARD.....
/* this.user = localStorage.getItem('id')!;
this.cargarEmpresasUsuario(this.user) */

    this.greeting();
   /*  this.company = this.companyUser
    console.log('company', this.company )
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;


    if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
    } else {
      if(this.companyUser.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
      } else {
        this.user = localStorage.getItem('id')!;
        this.cargarEmpresasUsuario(this.user)


      }
    } */
  }

 /*  themeEffect = effect(() => {
    if (this.configService.transitionComplete()) {
        if (this.designerService.preset()) {
            this.initChart();
        }
    }
}); */

chartBarData = {
  labels: ['Web', 'Email', 'Portal', 'Otros'],
  datasets: [{ data: [10, 7, 4, 2], backgroundColor: '#F39862' }]
};
chartBarOpts = {
  plugins: { legend: { display: false } },
  scales: { x: { grid: { display:false } }, y: { grid: { color:'#F3F4F6' } } }
};

chartDonutData = {
  labels: ['Salud', 'Provisiones'],
  datasets: [{ data:[25,75], backgroundColor: ['#53B4BA', '#16a34a'] }]
};
chartDonutOpts = { plugins: { legend: { position:'right' } } };

chartTinyData = {
  labels: ['Activos', 'Retirados'],
  datasets: [{ data:[50,10], backgroundColor: '#53B4BA'}],

};
chartTinyOpts = { plugins: { legend:{display:false} } };

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
    this.user = localStorage.getItem('id')!;
    this.cargarEmpresasUsuario(this.user)
    this.greeting();

    /* this.getPeriodByProcess( this.empresa.id ) */

    //this.initChart();
  }

//grafica

/* initChart() {
  if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                  borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'My Second dataset',
                  backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                  borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };


      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
    this.cd.markForCheck()
}

} */



//fin grafica






   getPeriodByProcess( id: string ) {

     this._periodService.getPeriodByCompanyByProcess( id )
        .subscribe ( (period: any) => {

          if (period.data && Array.isArray(period.data)) {

            this.period = period.data[0];
            console.log('periodo333',period)
            console.log('periodoarray',Array.isArray(period.data))

          }else{
            this.createdPeriod(this.empresa.id, this.yearPeriod = new Date().getFullYear())
            console.log('else periodo')
            console.log('periodo333',period)
            console.log('periodoarray',Array.isArray(period.data))
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

        })

  }


  /* cargarEmpresasUsuario(iduser: string){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( companyUser => {
      c
      this.companyUser = companyUser.companies[0]

      this.usuario = companyUser.user
      this.empresa =  this.companyUser;
      console.log('empresaasss', this.empresa )
      this.getPeriodByProcess( this.empresa.id );
    });
  } */

  cargarEmpresasUsuario(iduser: any) {
    this._companyService.cargarCompanysUser(iduser).subscribe(
      (resp: any) => {
        if (resp && resp.companies) {

          this.companyUser = resp.companies;

          this.usuario = resp.user;

          if(this.companyUser.length > 1 ){
            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
            console.log('selecc',JSON.parse(localStorage.getItem('empresaseleccionada')!))
            this.getPeriodByProcess( this.empresa.id );

          }else{
            this.empresa =  this.companyUser[0];

            this.getPeriodByProcess( this.empresa.id );

          }

        } else {
          this.companyUser = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
        }

        this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
      },
      (error) => {
        console.error('Error al cargar las empresas:', error);
        this.companyUser  = { companies: [] }; // En caso de error, aseguramos que no falle
      }
    );
  }






}


