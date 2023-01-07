import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConceptService } from 'src/app/companies/services/companyService.index';
import { EmployeeService } from 'src/app/employees/services/employee/employee.service';
import { GetEmployeeService } from '../../services/get-employee.service';
import { PayrollService } from '../../services/payroll.service';
import { PeriodService } from '../../services/period.service';
import { AbsenteeService } from '../../services/absentee.service';
import { DiagnosisService } from '../../services/diagnosis.service';
import { Period} from '../../models/period.model'
import * as moment from 'moment';
import 'moment/locale/es';





interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-save-absentee-history',
  templateUrl: './save-absentee-history.component.html',
  styleUrls: ['./save-absentee-history.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog {
             width: 50vw;
            margin: 0 auto 20rem auto;
             display: block; 
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class SaveAbsenteeHistoryComponent implements OnInit {


  

  forma!: FormGroup
  absenteeDialog!: boolean;
  registro: any = {};
  absentee: any = {};
  absenteeEmployee: any = {};
  absenteeType: any = {};
  absenteeTypeId: any = [0];
  diagnosis: any = {};
  submitted!: boolean;
  statuses!: any[];
  types: any = [];
  typeSelect!: string;
  myDate = moment();
  period: any = {};
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  employeeSelect: any;
  hideFields: boolean = false
  es: any;
  initialDate!: Date[];
  quantity: number = 0;
  returnDatei!: any;
  endDatei!: any;
  rangeDates!: Date[];

    minDate!: Date;

    maxDate!: Date;
    invalidDates!: Array<Date>

    displayPosition!: boolean;

    position!: string;
  


  constructor(private fb: FormBuilder,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              public ref: DynamicDialogRef,
              private _absenteeService: AbsenteeService,
              private _diagnosisService: DiagnosisService,
              private _periodService: PeriodService,
              public _usuarioService: AuthService,
              public _getEmployeeService: GetEmployeeService, 
              ) { 

                moment.locale('es');

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

                this.getAbsenteeType();
                this.getDiagnosis();
                this.getPeriodByProcess(this.empresa.id)
this.crearFormulario()
                
                

                
  }
  get absenteeTypeNoValido(){return this.forma.get('absenteeType')!.invalid && this.forma.get('absenteeType')!.touched}
  


  ngOnInit(): void {

    this.getAbsenteeType()

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];


this.quantity = 0

  }

  crearFormulario(){
  this.forma = this.fb.group({
    absenteeType      : [''],
    baseAbsences: [''],
    initialDate: [''],
    endDate: [''],
    day: [''],
    returnDate: [''],
    diagnosis: [''],
    referenceNumber: [''],
    doctorName: [''],
    doctorIdentification: [''],
    referenceInhability: ['']
  });
}



getAbsenteeType(){
  this._absenteeService.getAbsenteeType()
        .subscribe( (absenteeType: any) => {
          this.absenteeType = absenteeType;
          
        });
}

getAbsenteeTypeById(id:string){
  this._absenteeService.getAbsenteeTypeById(id)
        .subscribe( (absenteeType: any) => {
          this.absenteeTypeId = absenteeType;
         console.log('tipo', this.absenteeTypeId)
          switch (this.absenteeTypeId[0].code) {
            case 'A200':
              this.hideFields = true;
                break;
            case 'A250':
              this.hideFields = true;
                break;
            case 'A300':
              this.hideFields = true;
                break;
            case 'A350':
              this.hideFields = true;
                break;
            case 'A400':
                  this.hideFields = true;
                break;
            case 'A450':
                  this.hideFields = true;
                break;
            case 'A500':
                  this.hideFields = true;
                break;
             case 'A550':
                  this.hideFields = true;
                break;
            default:
              this.hideFields = false;
              break;
        }



        });
}



getDiagnosis(){
  this._diagnosisService.getDiagnosis()
        .subscribe( (diagnosis: any) => {
          this.diagnosis = diagnosis;
        });
}

getAbsenteeByEmployeeByPeriod(employee_id: string, ini_period: Date, end_period: Date){
  this._absenteeService.getAbsenteeByEmployeeByPeriod(employee_id, ini_period, end_period)
        .subscribe( (absentees: any) => {
          this.absenteeEmployee = absentees;
          if (this.absenteeEmployee) {
            this.getAbsenteeTypeById(this.absenteeEmployee[0].absenteeType_id)
          }
          console.log('ausentismos', this.absenteeEmployee)
          
        });
}


getPeriodByProcess( id: string ) {
    
  this._periodService.getPeriodByCompanyByProcess( id)
      .subscribe( (period: any) => {
        this.period[0] = period[0];
        console.log(period,this.period.number,this.period[0].number,'periodo33')
         if (this.period) {


         this._getEmployeeService.recibir.subscribe(dato =>{
            this.employeeSelect = dato
            this.getAbsenteeByEmployeeByPeriod(this.employeeSelect,this.period[0].initialDate, this.period[0].endDate)
         })
          
          /* this.getMovementByPeriod( this.period[0].id );
          this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id );  */
        } 
      });

} 


  saveAbsenteeHistory(){

    
    if (this.forma.invalid){
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
      });
    } 
  
  
    const form = [
      {
        employee_id: this.employeeSelect,
        company_id: this.empresa.id,
        absenteeType_id: this.forma.value.absenteeType,
        initialAbsencesDate: this.forma.value.initialDate,
        endAbsencesDate: this.forma.value.endDate,
        quantity: this.forma.value.day,
        baseAbsences: this.forma.value.baseAbsences,
        value:0,
        isActive: true,
        returnDate: this.forma.value.returnDate,
        diagnosis_id: this.forma.value.diagnosis,
        referenceNumber:this.forma.value.referenceNumber,
        doctorName:this.forma.value.doctorName,
        doctorIdentification:this.forma.value.doctorIdentification,
        referenceInhability:this.forma.value.referenceInhability
      }
    ]
  
   
    
    this.registro =  JSON.parse(JSON.stringify(form[0]));
    
    console.log('registro', this.registro)
     /* this._movementService.saveNovelties(this.novelties)
          .subscribe( () => this.getMovementPayrollByEmployee( this.empresa.id, this.period[0].id ));  */
  
  
          this._absenteeService.saveAbsenteeByEmployee(this.registro)
          .subscribe( (resp: any) => {
           
            this.submitted = false;
            this.absenteeDialog = false;
            this.getPeriodByProcess(this.empresa.id)
           
         
          }); 


  }

  openAbsentee(position: string){
    this.absentee = {};
    this.submitted = false;
    this.absenteeDialog = true;
    this.position = position;
    this.displayPosition = true;

    
    //this._getEmployeeService.enviar(employeeCard);
  }

  hideAbsentee() {
    this.absenteeDialog = false;
    this.submitted = false;
}



  deleteSelectedProducts(){

  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
}

  editProduct(absentee: string){

  }

  deleteProduct(absentee: string){

  }

  close(){
    this.ref.close();
  }

  cancelar(){
    this.submitted = false;
    this.absenteeDialog = false;
  }

  onSelect(id: string): void {
    
    this.getAbsenteeTypeById(id)
  
  }

  dateSelect(date: string): void {
    
    if (date) {
      this.day()
    }
    
  }

  dateiSelect(datei: string): void {
    
    if (datei) {
     
      this.day()
    }
    
  }

  day(){
    //this.endDatei = moment(this.formaAbsenteeHistory.value.initialDate).format('DD-MM-YYYY')
    //this.formaAbsenteeHistory.value.endDate = this.endDatei

    this.quantity  = moment(this.forma.value.endDate).diff(moment(this.forma.value.initialDate), 'days') + 1;
    this.forma.value.day = this.quantity
    
    //this.endDatei = moment(this.formaAbsenteeHistory.value.initialDate).format('DD-MM-YYYY')
    //this.formaAbsenteeHistory.value.endDate = this.endDatei

    this.returnDatei = moment(this.forma.value.initialDate).add(this.quantity , 'days').format('DD-MM-YYYY')
    this.forma.value.returnDate = this.returnDatei
    

    
  }

}
