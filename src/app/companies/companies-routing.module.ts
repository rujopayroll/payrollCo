import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent } from './pages/companies/companies.component';
import { LoginComponent } from '../auth/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    
    children: [
      
      {
        path: 'config',
        component: CompaniesComponent
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
