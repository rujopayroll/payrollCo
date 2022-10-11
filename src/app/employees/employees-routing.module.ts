import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { PersonalComponent } from './pages/new/personal/personal.component';
import { NewEmployeeRoutingModule } from './pages/new/new-routing.module';

const routes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'new:personal',
        component: NewComponent
      },
      {
        path: 'new:working',
        component: NewComponent
      },

      /* {
      path: 'personal', 
      component: PersonalComponent
      }, */

      {
        path: ':id',
        component: EmployeeComponent
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
    RouterModule,
    NewEmployeeRoutingModule
  ]
})
export class EmployeesRoutingModule { }