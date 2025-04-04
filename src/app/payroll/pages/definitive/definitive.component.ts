
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../../companies/services/company/company.service';
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
import { ToastModule } from 'primeng/toast';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { GetEmployeeService } from '../../services/get-employee.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-definitive',
  templateUrl: './definitive.component.html',
  styleUrls: ['./definitive.component.scss'],

  providers: [DialogService, ConfirmationService, MessageService],
})
export class DefinitiveComponent implements OnInit {

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
  filter: any[] = [];
  filter1: any[] = [];
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
  selectMovementsPayroll!: Movements [] | null;
  movementsDef!: Movements [];
  movementDef!: Movements ;
  /* product!: Product; */
  /* selectedProducts!: Product[] | null; */
  software!: any[];
  selectSoftware!: any [];
  bank!: any[];
  selectBank!: any [];
  visibleContable: boolean = false;
  visibleBank: boolean = false;
  disabledContability: boolean =true;
  disabledPayroll: boolean =true;
  periodProcess: boolean =true;
  periodContability: boolean =true;
  constructor(
    public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
               public _usuarioService: AuthService,
               public _periodService: PeriodService,
               public _movementService: PayrollService,
              public dialogService: DialogService,
              public _getEmployeeService: GetEmployeeService,
              private _absenteeService: AbsenteeService,
              private fb: UntypedFormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
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



              /* this.createdPayroll(this.empresa.id)
              this.getEmployeeByCompany(this.empresa.id) */
              this.getPeriodByProcess(this.empresa.id)

              this.employeeSelect = new EventEmitter();
  }

  ngOnInit(): void {



    this.software = [
      { label: 'No Aplica', value: 'noaplica' },
      { label: 'Alegra', value: 'alegra' },
      { label: 'Sigo', value: 'sigo' },
      { label: 'Sap', value: 'sap' },
      { label: 'Contai', value: 'contai' }

  ];

  this.bank = [
    { label: 'Bancolombia', value: '1' },
    { label: 'Davivienda', value: '2' },
    { label: 'Banco Bogota', value: '3' },


];
  }

  selectedEmployee() {

}


  getPeriodByProcess( id: string ) {

    this._periodService.getPeriodByCompanyByProcess( id)
        .subscribe( (period: any={}) => {

          this.period = period.data;

          if (this.period) {

            this.getMovementByPeriod( this.period.id );
            this.getMovementPayrollByEmployee( this.empresa.id, this.period.id );

          }
          if (this.period.description === 'Proceso') {

            this.periodProcess = true
          } else {
            this.periodProcess = false
          }
          if (this.period.description === 'Contabilizado') {

            this.periodContability = true
          } else {
            this.periodContability = false

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

  getMovementByConcept(id: string , period: string) {
    this._movementService.getMovementsByConcept( id, period )
        .subscribe( conceptMovements => {
          this.concept = conceptMovements
        });
  }

  getMovementPayrollByEmployee(id: string, period: string ) {
    this._movementService.getMovementsPayrollByEmployee( id, period )
        .subscribe( employeeMovementsPayroll => {
         this.employeeMovementsPayroll = employeeMovementsPayroll

         /* this.filter = employeeMovementsPayroll[0].salariales;
          console.log('filter',this.filter)
          this.filter1 = _.map(this.filter, function(o) { */
            //if (o.name == "john") return o;
            if (this.employeeMovementsPayroll) {

              this.getEmployeeById( this.employeeMovementsPayroll[0].employee_id );
            }
        });
  }

  getEmployeeById( id: string) {
    this._employeeService.cargarEmployees( id )
        .subscribe((employee:Employee) => {
          console.log(employee)
          this.employee  = employee
          console.log(this.employee,'solo')
        })
  }

  showDialog() {
    this.visibleContable = true;
    console.log('selecc', this.selectMovementsPayroll)

  }

  showDialogBank() {
    this.visibleBank = true;
  }

  hideDialog() {
    /* this.infoEmployeeDialog = false;
    this.submitted = false; */
  }

  buscarEmployees( termino: string){

  }

  contabilizar(){
    this.visibleContable = false;
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Archivo Generado",
      showConfirmButton: false,
      timer: 1500
    });
    this.selectMovementsPayroll = null
  }



}
