import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/pages/login/login.component';
import { DefinitiveComponent } from './pages/definitive/definitive.component';
import { NoveltiesComponent } from './pages/novelties/novelties.component';


const routes: Routes = [
  {
    path: '',
    
    children: [
      
      {
        path: 'novelties',
        component: NoveltiesComponent
      },
      {
        path: 'definitive',
        component: DefinitiveComponent
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