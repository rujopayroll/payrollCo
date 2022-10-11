import {AfterViewInit, Component,OnInit, ChangeDetectorRef, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeNewService } from '../../../services/employeeNew/employee-new.service';
import { Router } from '@angular/router';
import { IdentificationType } from '../../../models/identificationType.model';
import { Gender } from '../../../models/gender.model';
import { Country } from '../../../../companies/models/country.model';
import { State } from '../../../../companies/models/state.model';
import { City } from '../../../../companies/models/city.model';
import { EmployeeService, IdentificationTypeService, GenderService, CountryService, StateService, 
    CityService } from '../../../services/employeeService.index';
import { AuthService } from '../../../../auth/services/authservice.index';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    //styleUrls: ['./personal.component.scss'],
    
  })
export class PersonalComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller1') scroller!: ElementRef;
    date!: Date;
    personalInformation: any;
    empresaseleccionada: any = {};
    public company: any = {};
    empresa: any = {};
    usuario: any = {};
    submitted: boolean = false;
    identificationTypes: IdentificationType [] = [];
    genders: Gender[] = [];
    countries: Country[] = [];
    states: State[] = [];
    cities: City[] = [];
    municipios!: any [];
    minDate!: Date;
    forma!: UntypedFormGroup;
    maxDate!: Date;

    invalidDates!: Array<Date>
    es: any;
    constructor(
                private fb: UntypedFormBuilder,
                public _employeeNewService : EmployeeNewService, 
                private router: Router,
                public _identificationTypeService: IdentificationTypeService,
                public _genderService: GenderService,
                public _countryService: CountryService,
                public _stateService: StateService,
                public _cityService: CityService,
                private changeDetector: ChangeDetectorRef,
                public pageScrollServ: PageScrollService,
                @Inject(DOCUMENT) private document: any
                ) { 
                  
                }


               

    ngOnInit() { 

      this.pageScrollServ.scroll({
        document: this.document,
        scrollTarget: '.theEnd',
      }); 

      this.getAllIdentificationType();
      this. getAllGender();
      this.getAllCountry();
      this.getAllState();
      this.getAllCity();

        this.personalInformation = this._employeeNewService.getEmployeeInformation().personalInformation;
       
     

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
    }





    ngAfterViewInit(){
                    
    }

    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }

    nextPage() {
        if (this.personalInformation.pnombre) {
            this._employeeNewService.employeeInformation.personalInformation = this.personalInformation;
            this.router.navigate(['/employees/new/working']);

            return;
        }

        this.submitted = true;
    }

    onScroll(event: HTMLElement, i:any) {
      this.pageScrollServ.scroll({
        scrollTarget: event,
        scrollOffset: 50,
        document: this.document
      });
    
    }


    getAllIdentificationType()  {
        this._identificationTypeService.cargarTiposDocumentos()
            .subscribe( identificationType => {
              this.identificationTypes = identificationType;    
      });
      }

      getAllGender()  {
        this._genderService.cargarGeneros()
            .subscribe( genders => {
              this.genders = genders;    
      });
      }
      getAllCountry()  {
        this._countryService.cargarPaises()
            .subscribe( countries => {
              this.countries = countries;
              console.log(this.countries)
              
      });
      }

      getAllState()  {
        this._stateService.cargarDepartamentos( )
            .subscribe( states => {
              this.states = states;
      });
      }

      getAllCity()  {
        this._cityService.cargarMunicipios( )
            .subscribe( cities => {
              this.cities = cities;
      });
      }

      cargarMunicipiosDeptos(id: string) {
        this._cityService.obtenerMunicipioDepto(id)
            .subscribe( municipios => {
                this.municipios = municipios;
                console.log('muni', this.municipios)
            });
      }
    
      onSelect(id: string): void {
        this.cargarMunicipiosDeptos(id);
      }

    
    


}