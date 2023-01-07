import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../../companies/services/companyService.index';
import { Company } from '../../../companies/models/company.model';
/* import {MessageService, SelectItem } from 'primeng/api'; */
import { EmployeeService } from '../../../employees/services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../../employees/models/employee.model';
import { Movements } from '../../models/movements.model';
import { Period} from '../../models/period.model'
import { PeriodService } from '../../services/payrollService.index';
import { PayrollService } from '../../services/payrollService.index';
import { AbsenteeService } from '../../services/absentee.service';
import { CreateNoveltiesComponent } from '../../components/create-novelties/create-novelties.component';
import { SaveExtraHoursComponent } from '../../components/save-extra-hours/save-extra-hours.component';
import { SaveAbsenteeHistoryComponent } from '../../components/save-absentee-history/save-absentee-history.component';
import {MenuItem} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { GetEmployeeService } from '../../services/get-employee.service';
//import { stringify } from '@angular/compiler/src/util';

declare var $: any;


@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrls: ['./novelties.component.scss'],
  providers: [DialogService],
  
})
export class NoveltiesComponent implements OnInit {


  @Input() employeeS: any ={};
  @Input() index!: string;

  @Output() employeeSelect!: EventEmitter<string>

  ssModal!: boolean;
  ref!: DynamicDialogRef;
  ref1!: DynamicDialogRef;

  items!: MenuItem[];
  movements: any = {};
  employee: any = {};
  employees: any = {};
  employeesCompany: any = {};
  employeeMovements: any = [];
  employeeMovementsPayroll: any[] = [];
  period: any = {};
  empleado!: string;
  absenteeEmployee: any = {};
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  concept: any = {};
  employeeSelects!: string
  indexTab: number = 0;
  activeItem:any;
 

  forma: UntypedFormGroup = this.fb.group({
   
  });


  constructor( public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _movementService: PayrollService,
              public dialogService: DialogService,
              public _getEmployeeService: GetEmployeeService, 
              private _absenteeService: AbsenteeService,
              private fb: UntypedFormBuilder,
            
              
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

                          
                          this.createdPayroll(this.empresa.id)
                          this.getEmployeeByCompany(this.empresa.id)
                          this.getPeriodByProcess(this.empresa.id)

                          this.employeeSelect = new EventEmitter();
                         
                      

               }



  ngOnInit(){

    this.items = [{
    label:'Novedades',
      items: [{
          label: 'Ausentismos',
          command: () => {
            this.showAbsentee(this.activeItem);
        } 
      },
      {
          label: 'Horas Extras',
          
           command: () => {
            this.showOverTime(this.activeItem);
        } 
          
      },
      {
        label: 'Pagos Salariales',
        command: () => {
          this.show(this.activeItem, 'SALARIAL');
      } 
    },

    {
      label: 'Pagos No Salariales',
      
      command: () => {
        this.show(this.activeItem, 'NOSALARIAL');
    } 
  },
  {
    label: 'Deducciones',
    
    command: () => {
      this.show(this.activeItem, 'DEDUCCION');
  } 
},
      ]},
      
  ];

   }

  

   openNext() {
    this.indexTab = (this.indexTab === 2) ? 0 : this.indexTab + 1;
    

    $(document).ready(function() {
      $("#tabDef").disabled = 'true';
    });

    

}

    getPeriodByProcess( id: string ) {
    
    this._periodService.getPeriodByCompanyByProcess( id)
        .subscribe( (period: any={}) => {
          this.period[0] = period[0];
          
          if (this.period) {
           
            this.getMovementByPeriod( this.period[0].id );
            this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id ); 
          }
        });

  } 
  

  getMovementByPeriod( id: string ) {
    
    this._movementService.getMovementsByPeriod(id)
        .subscribe( (movement:Movements) => {
          this.movements = movement
          console.log(movement,'MovementByperiod')
          if (this.movements) {
           
            
            this.getMovementByConcept( this.movements[40].concept_id, this.movements[40].period_id)
            
          }
        });

  }

  getMovementByEmployee(id: string, period: string ) {
    this._movementService.getMovementsByEmployee( id, period )
        .subscribe( employeeMovements => {
          this.employeeMovements = employeeMovements
          console.log(employeeMovements,'movimientoempleados')
          if (this.employeeMovements) {
           
            this.getEmployeeById( this.employeeMovements[0].employee_id );
            
            
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

  getMovementByConcept(id: string , period: string) {
    this._movementService.getMovementsByConcept( id, period )
        .subscribe( conceptMovements => {
          this.concept = conceptMovements
        });
  }
  
  createdPayroll(id: string) {
    this._movementService.createPayroll(id)
        .subscribe((payrollCreated: any) => {
          console.log(payrollCreated,'creado')
        })
  }




  getEmployeeById( id: string) {
    this._employeeService.cargarEmployees( id )
        .subscribe((employee:Employee) => {
          console.log(employee)
          this.employee  = employee
          console.log(this.employee,'solo')
        })
  }

  getEmployeeByCompany( id: string) {
    this._employeeService.cargarEmployeeCompany( id )
        .subscribe((employeesCompany:Employee) => {
          console.log(employeesCompany)
          this.employeesCompany  = employeesCompany
          console.log(this.employeesCompany)
        })
  }
  
  buscarEmployees( termino: string){

  }

    show(employeeCard: string, group: string) {
    this.ref = this.dialogService.open(CreateNoveltiesComponent,{
        header: 'Ingreso de Novedades' +' ' + group,
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
        
    });
    
    this._getEmployeeService.enviar(employeeCard);
    this._getEmployeeService.enviarGroup(group);

    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );
  });
  } 

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}


  showOverTime(employeeCard: string) {
    
    this.ref= this.dialogService.open(SaveExtraHoursComponent,{
        header: 'Ingreso Horas Extras y Recargos',
        width: '50%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
        
    });
    
     this._getEmployeeService.enviar(employeeCard);
    

    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );
      this.ref.destroy();
  });
  } 

  showAbsentee(employeeCard: string) {
    this.ref= this.dialogService.open(SaveAbsenteeHistoryComponent,{
        header: 'Ingreso de Ausentismos',
        width: '90%',
        contentStyle: {"height": "1000px"},
        baseZIndex: 0,
        closable: false
        
    });
    
     this._getEmployeeService.enviar(employeeCard);
    

    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );
  });
  } 


  
  veremployee(idx: number){
   console.log('empleado', idx) 
  }
 
/*   buscarEmployees( termino: string){

    if ( termino.length <= 0 ){
      console.log(termino,'hola')
      this.getEmployees( this.empresa.id);
      return;
    }

    this._employeeService.buscarEmployees( termino )
        .subscribe( resp => {
          this.employees = resp 
          console.log(this.employees)
        });
} */

ssModalDialog() {
  this.ssModal = true;
}


}
