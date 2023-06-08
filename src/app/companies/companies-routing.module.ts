import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { ListComponent } from '../companies/pages/list/list.component';
import { LoginGuardsGuard } from '../auth/services/guards/login-guards.guard';
import { VerificaTokenGuard } from '../auth/services/guards/verifica-token.guard';


const routes: Routes = [
  {
    path: '',

    children: [

      {
        path: 'config',
        component: CompaniesComponent, canActivate: [ LoginGuardsGuard, VerificaTokenGuard]
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: '**',
        component: LoginComponent
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
export class CompaniesRoutingModule { }
