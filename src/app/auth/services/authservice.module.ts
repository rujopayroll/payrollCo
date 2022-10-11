import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';







import { AuthService } from './authservice.index';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    AuthService
  ],
  declarations: [],
 
})
export class AuthserviceModule { }