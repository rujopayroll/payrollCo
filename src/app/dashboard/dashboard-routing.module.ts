import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardsGuard } from '../auth/services/guards/login-guards.guard';
import { VerificaTokenGuard } from '../auth/services/guards/verifica-token.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent, canActivate: [ LoginGuardsGuard, VerificaTokenGuard]
      },

      {
        path: '**',
        redirectTo: ''
      }
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
export class DashboardRoutingModule { }
