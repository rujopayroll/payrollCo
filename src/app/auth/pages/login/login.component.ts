import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from 'src/app/companies/services/company/company.service';
import { Company } from 'src/app/companies/models/company.model';
import { Usuario } from '../../models/usuario.model';
import { PeriodService } from 'src/app/payroll/services/payrollService.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  email!: string;
  recuerdame = false;
  empresa: Company[] = [];
  
  company: any;
  


  constructor( public _router: Router,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _companyService: CompanyService) { 

                

                

               }

  ngOnInit(): void {

    

   
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ){
    
  if (forma.invalid){
    return;
  }
  
  let usuario = new Usuario(null!, forma.value.email, forma.value.password);

  this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => {

      

        // if (this._usuarioService.empresas.length > 1) {
          if (this._usuarioService.empresas.length > 1) {
            
            
              this._router.navigate(['/companies/list']);
          
        
           
              
          
        } else {
            
           
            this._router.navigate(['/dashboard']);
            
          }
      });

let id = localStorage.getItem('id');
this._usuarioService.obtenerMenu(id!)


  }




}
