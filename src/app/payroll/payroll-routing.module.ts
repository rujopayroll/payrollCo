import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/pages/login/login.component';
import { DefinitiveComponent } from './pages/definitive/definitive.component';
import { NoveltiesComponent } from './pages/novelties/novelties.component';
import { LoginGuardsGuard } from '../auth/services/guards/login-guards.guard';
import { VerificaTokenGuard } from '../auth/services/guards/verifica-token.guard';


const routes: Routes = [
  {
    path: '',

    children: [

      {
        path: 'novelties',
        component: NoveltiesComponent, canActivate: [ LoginGuardsGuard, VerificaTokenGuard ]
      },
      {
        path: 'definitive',
        component: DefinitiveComponent, canActivate: [ LoginGuardsGuard, VerificaTokenGuard ]
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
export class PayrollRoutingModule { }
