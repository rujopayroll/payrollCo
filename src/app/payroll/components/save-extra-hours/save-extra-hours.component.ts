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
import { CompanyService } from '../../../companies/services/company/company.service';
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
  idUser: any;
  var: any
  period: any = {}
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
               public _companyService: CompanyService,
               public _getEmployeeService: GetEmployeeService,) {


    /* this.company = this._usuarioService.empresas;
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
              } */

              this.idUser = localStorage.getItem('id')!;
              this.usuario = JSON.parse(localStorage.getItem('usuario')!);


              this._getEmployeeService.recibirGroup.subscribe(group =>{


             })



                 }

  ngOnInit(): void {
    this.cargarEmpresasUsuario(this.idUser )


  }

   getPeriodByProcess( id: string ) {

    this._periodService.getPeriodByCompanyByProcess( id)
        .subscribe( period => {
          this.period = period.data[0];

          if (this.period) {

          this._getEmployeeService.recibir.subscribe(dato =>{
            this.employeeSelect = dato
            console.log('888', this.employeeSelect)
            console.log('888rrr', dato)
            this.getOverTimeByEmployee(this.employeeSelect, this.empresa.id,this.period.id)
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
        code_concept:"M009",
        code_constant: "HEDO",
        value: this.formaOverTime.value.hedo,

      },
      {
        code_concept:"M010",
        code_constant: "HENO",
        value: this.formaOverTime.value.heno,

      },
      {
        code_concept:"M011",
        code_constant: "RECO",
        value: this.formaOverTime.value.reco,

      },
      {
        code_concept:"M012",
        code_constant: "HEDD",
        value: this.formaOverTime.value.hedd,

      },

      {
        code_concept:"M013",
        code_constant: "HEND",
        value: this.formaOverTime.value.hend,

      },
      {
        code_concept:"M014",
        code_constant: "RECD",
        value: this.formaOverTime.value.recd,

      },
      {
        code_concept:"M015",
        code_constant: "HOND",
        value: this.formaOverTime.value.hond,

      }

    ]

     this.extras =  JSON.parse(JSON.stringify(formExtras, replacer))



     var extrasDef = this.extras.filter(function (overTime: any) {


       return overTime.value != 0;
     });


    const form = [
      {
        /* employee_id: this.employeeSelect,

        company_id: this.empresa.id, */
        novelties: extrasDef

      }
    ]

    this.register =  JSON.parse(JSON.stringify(form[0]));


    this._movementService.saveNoveltiesOverTime(this.empresa.id, this.employeeSelect, this.register)
        .subscribe( (resp: any) => {
          console.log('antes del filte', this.extras)
          console.log('filtro', form[0])
            this.ref.close();

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


  cargarEmpresasUsuario(iduser: any) {
    this._companyService.cargarCompanysUser(iduser).subscribe(
      (resp: any) => {
        if (resp && resp.companies) {

          this.company = resp.companies;

          this.usuario = resp.user;

          if(this.company .length > 1 ){
            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);

            this.getPeriodByProcess(this.empresa.id)



          }else{
            this.empresa =  this.company[0];

            this.getPeriodByProcess(this.empresa.id)

          }

        } else {
          this.company  = { companies: [] }; // Evita errores si la API devuelve un valor inesperado
        }

        this.usuario = resp?.user || {}; // Evita que `usuario` sea undefined
      },
      (error) => {
        console.error('Error al cargar las empresas:', error);
        this.company  = { companies: [] }; // En caso de error, aseguramos que no falle
      }
    );
  }


}
