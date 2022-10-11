

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable()
export class EmployeeNewService {

    
    employeeInformation = {
        personalInformation: {
            tipodoc: null,
            documento: '',
            pnombre: '',
            snombre: '',
            papellido: '',
            sapellido: '',
            genero: null,
            fnacimiento: '',
            paisr: null,
            deptor: null,
            ciudadr: null,
            direccion: '',
            telefono: '',
            celular: '',
            email: ''
            
            
        },
        workingInformation: {
            contractRegime: null,
            employeeType: null,
            workPlaceRisks: null,
            workingHour: null,
            transportAssistance: false,
            variableSalary: false
        },

        contractInformation: {
            contractType: null,
            initialContractDate: '',
            endContractDate: ''
        },

        salaryInformation: {
            salaryType: null,
            salary: 0,
            initialSalaryDate: '',
            endSalaryDate: ''
        },
        jobInformation: {
            costCenter: null,
            area: null,
            subsidiary: null,
            position: null
        },

        paymentInformation: {
            bank: null,
            accountType: null,
            accountNumber: 0
        },

        socialSecurityInformation: {
            contributorType: null,
            contributorSubType: null,
            entityHealth: null,
            entityPension: null,
            entitySeverance: null
        },

       
    };

    private socialSecurityComplete = new Subject<any>();

    socialSecurityComplete$ = this.socialSecurityComplete.asObservable();

    getEmployeeInformation() {
        return this.employeeInformation;
    }

    setEmployeeInformation(employeeInformation: any) {
        this.employeeInformation = employeeInformation;
    }

    complete() {
        this.socialSecurityComplete.next(this.employeeInformation.personalInformation);
    }
}
