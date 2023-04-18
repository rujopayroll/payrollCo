import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule)
  },

  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then (m => m.CompaniesModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then (m => m.DashboardModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then (m => m.EmployeesModule)
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll/payroll.module').then (m => m.PayrollModule)
  },
  {
    path: '**',
    redirectTo:'auth'
  }
]



@NgModule({

  imports: [
    RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
    })],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
