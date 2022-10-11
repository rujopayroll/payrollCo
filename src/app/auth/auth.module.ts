import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNGModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class AuthModule { }
