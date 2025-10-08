import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../../companies/services/company/company.service';
import { Company } from '../../../companies/models/company.model';
/* import {MessageService, SelectItem } from 'primeng/api'; */
import { EmployeeService } from '../../../employees/services/employeeService.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/authservice.index';
import { Employee } from '../../../employees/models/employee.model';
import { Movements } from '../../models/movements.model';
import { DefinitiveComponent } from '../definitive/definitive.component';
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
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';


//import { stringify } from '@angular/compiler/src/util';
import { Concept } from '../../../companies/models/concept.model';

declare var $: any;


@Component({
  selector: 'app-novelties',
  templateUrl: './novelties.component.html',
  styleUrls: ['./novelties.component.scss'],

  providers: [DialogService, ConfirmationService, MessageService],

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
  employeeMovementsPayroll: any = {};
  filter: any[] = [];
  filter1: any[] = [];
  period: any = {};
  empleado!: string;
  absenteeEmployee: any = {};
  busqueda = '';
  company: any = {};
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  concept: any = {};
  employeeSelects!: string
  indexTab: number = 0;
  activeItem:any;
  selectMovementsPayroll: any[] = [];

  software!: any[];
  selectSoftware!: any [];
  bank!: any[];
  selectBank!: any [];
  visible: boolean = false;
  visibleBank: boolean = false;
  idUser: any;
  activeIndex: number = 0;
  lastConfirmedIndex: number = 0;

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
              public _companyService: CompanyService,
              private _absenteeService: AbsenteeService,
              private fb: UntypedFormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService

                ) {
                  this.employeeSelect = new EventEmitter();

                //this.company = this._usuarioService.empresas;
                this.idUser = localStorage.getItem('id')!;
               // this.empresaseleccionada = localStorage.getItem('empresaseleccionada')!;
                this.usuario = JSON.parse(localStorage.getItem('usuario')!);
                this.cargarEmpresasUsuario(this.idUser!)

                /* if ( this.empresaseleccionada ){
                            this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                          } else {
                            if(this.company.length > 1 ) {
                              this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
                            } else {
                              this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                            }
                          }
 */









               }



  ngOnInit(){

    this.cargarEmpresasUsuario(this.idUser!)
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

    //this.getPeriodByProcess(this.empresa.id)

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

  this._periodService.getPeriodByCompanyByProcess( id )
     .subscribe ( (period: any) => {
      this.period = period.data[0];
      //this.cargarEmpresasUsuario(this.idUser!)
       if (period && Array.isArray(period.data)) {

        this.getMovementByPeriod( this.period.id );
        this.getMovementPayrollByEmployee( this.empresa.id, this.period.id );
      }

     },
     (error) => {
       console.error('Error al cargar periodo en proceso', error);
       this.period = []; // Manejo de error para evitar undefined
     }

     );
}







  getMovementByPeriod( id: string ) {

    this._movementService.getMovementsByPeriod(id)
        .subscribe( (movement:Movements) => {
          this.movements = movement

          if (this.movements) {


            this.getMovementByConcept( this.movements.data[0].concept_id, this.movements.data[0].period_id)

          }
        });

  }

  getMovementByEmployee(id: string, period: string ) {
    this._movementService.getMovementsByEmployee( id, period )
        .subscribe( employeeMovements => {
          this.employeeMovements = employeeMovements

          if (this.employeeMovements) {

            this.getEmployeeById( this.employeeMovements[0].employee_id );


          }

        });
  }

  getMovementPayrollByEmployee(id: string, period: string ) {
    this._movementService.getMovementsPayrollByEmployee( id, period )
        .subscribe( employeeMovementsPayroll => {
         this.employeeMovementsPayroll =  Array.isArray(employeeMovementsPayroll) ? employeeMovementsPayroll : [employeeMovementsPayroll]

            if (this.employeeMovementsPayroll) {

              this.getEmployeeById( this.employeeMovementsPayroll[0].id );
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

        })
  }




  getEmployeeById( id: string) {
    this._employeeService.cargarEmployees( id )
        .subscribe((employee:Employee) => {

          this.employee  = employee

        })
  }

  getEmployeeByCompany( id: string) {
    this._employeeService.cargarEmployeeCompany( id )
        .subscribe((employeesCompany:Employee) => {

          this.employeesCompany  = employeesCompany

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
      this.getMovementPayrollByEmployee( this.empresa.id, this.period.id );
  });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}


  showOverTime(employeeCard: string) {
console.log('showOverTime', employeeCard)
    this.ref= this.dialogService.open(SaveExtraHoursComponent,{
        header: 'Ingreso Horas Extras y Recargos',
        width: '50%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000

    });

     this._getEmployeeService.enviar(employeeCard);


    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period.id );
      this.ref.destroy();
  });
  }

  showAbsentee(employeeCard: string) {
    console.log('showAbsentee', employeeCard)
    this.ref= this.dialogService.open(SaveAbsenteeHistoryComponent,{
        header: 'Ingreso de Ausentismos',
        width: '90%',
        contentStyle: {"height": "1000px"},
        baseZIndex: 0,
        closable: false

    });

     this._getEmployeeService.enviar(employeeCard);


    this.ref.onClose.subscribe(() => {
      this.getMovementPayrollByEmployee( this.empresa.id, this.period.id );
      this.ref.destroy();
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

showDialog() {
  this.visible = true;
}

showDialogBank() {
  this.visibleBank = true;
}

hideDialog() {
  /* this.infoEmployeeDialog = false;
  this.submitted = false; */
}


cargarEmpresasUsuario(iduser: any) {
  this._companyService.cargarCompanysUser(iduser).subscribe(
    (resp: any) => {
      if (resp && resp.companies) {

        this.company = resp.companies;

        this.usuario = resp.user;

        if(this.company.length > 1 ){
          this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada')!);
          this.createdPayroll(this.empresa.id)
          this.getEmployeeByCompany(this.empresa.id)
          this.getPeriodByProcess(this.empresa.id)


        }else{
          this.empresa =  this.company[0];
          this.createdPayroll(this.empresa.id)
          this.getEmployeeByCompany(this.empresa.id)
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

onTabChange(event: any) {
  const attemptedIndex = event.index;

  // Caso: solo confirmamos si se va del Tab 1 al Tab 2
  if (this.lastConfirmedIndex === 0 && attemptedIndex === 1) {
    // Cancelar visualmente el cambio de pestaña
    setTimeout(() => {
      this.activeIndex = this.lastConfirmedIndex;
    }, 0);

    // Mostrar diálogo de confirmación
    this.confirmationService.confirm({
      message: '¿Estas Seguro que la nomina ya esta correcta?',
      header: 'Confirmación',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.lastConfirmedIndex = attemptedIndex;
        this.activeIndex = attemptedIndex;
      },
      reject: () => {
        // Volver (o mantener) al tab 1 si rechaza
        this.activeIndex = 0;
        this.lastConfirmedIndex = 0;
      }
    });
  } else {
    // Cambios normales sin confirmación
    this.lastConfirmedIndex = attemptedIndex;
    this.activeIndex = attemptedIndex;
  }
}




}

