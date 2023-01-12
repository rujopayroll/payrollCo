import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Company } from '../../../companies/models/company.model';
import { Concept } from '../../../companies/models/concept.model';
import { EmployeeService } from '../../../employees/services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../../employees/models/employee.model';
import { Movements } from '../../models/movements.model';
import { Period} from '../../models/period.model'
import { PeriodService } from '../../services/payrollService.index';
import { ConceptService } from '../../../companies/services/concept/concept.service';
import { PayrollService } from '../../services/payrollService.index';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { GetEmployeeService } from '../../services/get-employee.service';
import { async, Observable } from 'rxjs';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

declare var $: any;





@Component({
  selector: 'app-get-novelties',
  templateUrl: './create-novelties.component.html',
  
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`],
providers: [MessageService]

})
export class CreateNoveltiesComponent implements OnInit {


 

@Input() employee_id_heredado : string = '';
@Input() index: string = '';

  products2!:  any[];
  concepts: any = [];
  selectConcept: any = [];
  movements!: any;
  
  period: any;
  employeeSelect: any;
  employee: any = {};
  employees: any = {};
  company: any;
  employeeMovementsPayroll: any = {};
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  novelties: any = [];
  register: any = {};
  noveltiesS: any = [];
  group: string = '';
  

  

  formaNovelty: UntypedFormGroup = this.fb.group({
    concept       : ['', [Validators.required]],
    value      : ['', [Validators.required]],
  });


  constructor(
    public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _movementService: PayrollService,
               public _conceptService: ConceptService,
               public _getEmployeeService: GetEmployeeService,
               public dialogService: DialogService,
               public ref: DynamicDialogRef,
               public _router: Router,
               private messageService: MessageService,
               private fb: UntypedFormBuilder
  ) {

    this.company = this._usuarioService.empresas;
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);

    if ( this.empresaseleccionada ){
                this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
              } else {
                if(this.company.length > 1 ) {
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                } else {
                  this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                }
              }

              this._getEmployeeService.recibirGroup.subscribe(group =>{
                this.group = group
                
             })
              
              // this.getPeriodByProcess(this.empresa.id)
             
   }

  ngOnInit(): void {
    this.getConceptNovelty(this.empresa.id)
    this.getPeriodByProcess(this.empresa.id)
    

    interface Concept2 {
      concept: string,
      value: string
  } 
  
  }




add() {
  this.novelties.push({'concepto':"", 'valor':""});
  
}



getConceptNovelty(id: string) {

  if (this.group == 'SALARIAL'){
    
    this._conceptService.getConceptNovelty(id)
    .subscribe((concepts:any) =>{
      this.concepts= concepts
    })
  }else if(this.group=='NOSALARIAL'){
    
    this._conceptService.getConceptNoSalaryNovelty(id)
    .subscribe((conceptNoSalary: any) =>{
      this.concepts=conceptNoSalary
    })
  }else if(this.group=='DEDUCCION'){
    
    this._conceptService.getConceptDeductionNovelty(id)
    .subscribe((conceptDeduction: any) => {
      this.concepts = conceptDeduction
    })
  }
}

 getMovementsNovelty(idEmployee: string, idCompany: string, idPeriod: string ) {
   if(this.group == 'SALARIAL'){
     console.log(this.group)
    this._movementService.getMovementsNovelty(idEmployee, idCompany, idPeriod )
    .subscribe((noveltySalary: any) => {
      this.novelties = noveltySalary
    })
   }else if (this.group == 'NOSALARIAL'){
    console.log(this.group)
    this._movementService.getMovementsNoveltyNoSalary(idEmployee, idCompany, idPeriod )
    .subscribe((noveltyNoSalary: any) => {
      console.log(noveltyNoSalary)
      this.novelties = noveltyNoSalary
      console.log('aqui',this.novelties)

    })
   }else if (this.group == 'DEDUCCION'){
    console.log(this.group)
    this._movementService.getMovementsNoveltyDeduction(idEmployee, idCompany, idPeriod )
    .subscribe((noveltyDeduction: any) => {

      this.novelties = noveltyDeduction
      
    })
   }
  
} 

getPeriodByProcess( id: string ) {
    
  this._getEmployeeService.recibirGroup.subscribe(group =>{
    this.group = group
    
 })

  this._periodService.getPeriodByCompanyByProcess( id)
      .subscribe( (period: Period) => {
        this.period = period;
        
        if (this.period) {
         
        this._getEmployeeService.recibir.subscribe(dato =>{
          this.employeeSelect = dato
          
this.getMovementsNovelty( this.employeeSelect, this.empresa.id, this.period[0].id ); 
       })

       

         }


      });

}
 
getMovementPayrollByEmployee(id: string, period: string ) {
  this._movementService.getMovementsPayrollByEmployee( id, period )
      .subscribe( employeeMovementsPayroll => {
        this.employeeMovementsPayroll = employeeMovementsPayroll
       
        if (this.employeeMovementsPayroll) {
         
          this.getEmployeeById( this.employeeMovementsPayroll[0].employee_id );
          
          
        }

      });
}

getEmployeeById( id: string) {
  this._employeeService.cargarEmployees( id )
      .subscribe((employee:Employee) => {
        
        this.employee  = employee
        
      })
}

/* getMovementPayrollByEmployee(id: string, period: string ) {
  this._movementService.getMovementsPayrollByEmployee( id, period )
      .subscribe( employeeMovementsPayroll => {
        this.employeeMovementsPayroll = employeeMovementsPayroll
        console.log(employeeMovementsPayroll,'movimientoempleados555')
        if (this.employeeMovementsPayroll) {
         
          this.getEmployeeById( this.employeeMovementsPayroll[0].employee_id );
          
          
        }

      });
} */





saveNovelties(data: any){
  
console.log('entro por aca')
  this.noveltiesS =  JSON.parse(JSON.stringify(data,['concept_id', 'value'])) 

 
  
  /* if (this.formaNovelty.invalid){

    return Object.values (this.formaNovelty.controls).forEach( control =>{

      if (control instanceof FormGroup) {
        Object.values (control.controls).forEach( control => control.markAsTouched());

      } else{
        control.markAsTouched();
      }
    });
  } */


  const form = [
    {
      employee_id: this.employeeSelect,
      company_id: this.empresa.id,
      conceptGroup: this.group,
      novelties: this.noveltiesS
    }
  ]

  
  
  this.register =  JSON.parse(JSON.stringify(form[0]));
  
  
   /* this._movementService.saveNovelties(this.novelties)
        .subscribe( () => this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id ));  */


        this._movementService.saveNovelties(this.register)
        .subscribe( (resp: any) => {
         
          this.ref.close();
         
       
        }); 
}

deleteNovelty(index: number){
  this.novelties.splice(index,1)
  

}

campoEsValido( campo: string){
  return this.formaNovelty.controls[campo].errors 
      && this.formaNovelty.controls[campo].touched
}




}
