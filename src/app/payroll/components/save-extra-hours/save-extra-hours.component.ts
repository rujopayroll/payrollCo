import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConceptService } from 'src/app/companies/services/concept/concept.service';
import { EmployeeService } from 'src/app/employees/services/employee/employee.service';
import { GetEmployeeService } from '../../services/get-employee.service';
import { PayrollService } from '../../services/payroll.service';
import { PeriodService } from '../../services/period.service';
import { Period} from '../../models/period.model'

@Component({
  selector: 'app-save-extra-hours',
  templateUrl: './save-extra-hours.component.html',
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`],
styleUrls: ['./save-extra-hours.component.scss'],
providers: [MessageService]
})
export class SaveExtraHoursComponent implements OnInit {

  visibleSidebarE: any;
  register: any = {};
  extras: any = {};

  var: any
  period: any;
  employeeSelect: any;
  employee: any = {};
  employees: any = {};
  company: any;
  employeeMovementsPayroll: any = {};
  employeeOverTimePayroll: any = {};
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  hedo : number = 0;
  heno : number = 0;
  reco : number = 0;
  hedd: number = 0;
  hend: number = 0;
  hond: number = 0;
  recd: number = 0;



  formaOverTime: UntypedFormGroup = this.fb.group({
    hedo       : [''],
    heno       : [''],
    reco       : [''],
    hedd       : [''],
    hend       : [''],
    hond       : [''],
    recd       : [''],
  });

  constructor(  private fb: UntypedFormBuilder,
                private messageService: MessageService,
                public dialogService: DialogService,
               public ref: DynamicDialogRef,
               public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _movementService: PayrollService,
               public _conceptService: ConceptService,
               public _getEmployeeService: GetEmployeeService,) {


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


             })

             this.getPeriodByProcess(this.empresa.id)

                 }

  ngOnInit(): void {



  }

   getPeriodByProcess( id: string ) {



    this._periodService.getPeriodByCompanyByProcess( id)
        .subscribe( (period: Period) => {
          this.period = period;

          if (this.period) {

          this._getEmployeeService.recibir.subscribe(dato =>{
            this.employeeSelect = dato
            this.getOverTimeByEmployee(this.employeeSelect, this.empresa.id, this.period[0].id)
         })



           }


        });

  }



  cancelar(){
    this.ref.destroy();
  }

  saveOverTime(){


function replacer(key: any, value: any) {

  if (value.quantity == 0) {
    return undefined;
  }
  return value;
}

    const formExtras= [

      {
        code:"M009",
        quantity: this.formaOverTime.value.hedo,
        codeConst: "HEDO"
      },
      {
        code:"M010",
        quantity: this.formaOverTime.value.heno,
        codeConst: "HENO"
      },
      {
        code:"M011",
        quantity: this.formaOverTime.value.reco,
        codeConst: "RECO"
      },
      {
        code:"M012",
        quantity: this.formaOverTime.value.hedd,
        codeConst: "HEDD"
      },

      {
        code:"M013",
        quantity: this.formaOverTime.value.hend,
        codeConst: "HEND"
      },
      {
        code:"M014",
        quantity: this.formaOverTime.value.recd,
        codeConst: "RECD"
      },
      {
        code:"M015",
        quantity: this.formaOverTime.value.hond,
        codeConst: "HOND"
      }

    ]

     this.extras =  JSON.parse(JSON.stringify(formExtras, replacer))



     var extrasDef = this.extras.filter(function (overTime: any) {
       return overTime != null;
     });


    const form = [
      {
        employee_id: this.employeeSelect,
        company_id: this.empresa.id,
        noveltiesOverTime: extrasDef
      }
    ]

    this.register =  JSON.parse(JSON.stringify(form[0]));

    this._movementService.saveNoveltiesOverTime(this.register)
        .subscribe( (resp: any) => {

            this.ref.close();
            console.log('res', resp)
        });

  }

  campoEsValido( campo: string){
    return this.formaOverTime.controls[campo].errors
        && this.formaOverTime.controls[campo].touched
  }

  getOverTimeByEmployee(employee_id: string, company_id:string, period_id:string){

    this._movementService.getNoveltiesOverTimeByEmployee(employee_id, company_id, period_id)
      .subscribe( employeeOverTimePayroll => {
        this.employeeOverTimePayroll = employeeOverTimePayroll

       for (let i=0; i < this.employeeOverTimePayroll.length; i++){
        if( this.employeeOverTimePayroll[i].concept.code==='M009'){
          this.hedo = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M010'){
          this.heno = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M011'){
          this.reco = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M012'){
          this.hedd = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M013'){
          this.hend = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M014'){
          this.recd = this.employeeOverTimePayroll[i].quantity
        }
        if( this.employeeOverTimePayroll[i].concept.code==='M015'){
          this.hond = this.employeeOverTimePayroll[i].quantity
        }

    }
        //aca colocar la logica para mapear cada hora extra

      });

  }

}
