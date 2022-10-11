import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ErrorPageComponent
  ],
  exports: [
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule
  ]
})
export class SharedModule { }
