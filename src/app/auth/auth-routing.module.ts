import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainComponent } from './pages/main/main.component';



import { RegisterComponent } from './pages/register/register.component';
import { CompaniesListComponent } from './pages/companiesList/companiesList.component'

import { DashboardComponent } from '../dashboard/pages/dashboard/dashboard.component';
import { LoginGuardsGuard } from '../auth/services/guards/login-guards.guard';
import { VerificaTokenGuard } from '../auth/services/guards/verifica-token.guard';


const routes : Routes = [

  {
    path: 'profile',
    component: ProfileComponent,
  },



  {
    path: '',
    component: MainComponent,



    children: [

      {
        path: 'login',
       component: LoginComponent
        //component: DashboardComponent
      },

      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      },

    ]

  }










]


@NgModule({

  imports: [

    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
