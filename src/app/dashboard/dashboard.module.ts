import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import localeES from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es');




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNGModule,
    SharedModule
    
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-CO'}
  ],
})
export class DashboardModule { }
