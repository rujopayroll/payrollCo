import { Injectable, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeService {


  @Output() employeeSelectCard: EventEmitter<any> = new EventEmitter();
  @Output() groupSelectCard: EventEmitter<any> = new EventEmitter();

  private employeeSelect = new ReplaySubject<string>(1)
  private groupSelect = new ReplaySubject<string>(1)
  
  public get recibir() {
    return this.employeeSelect.asObservable()
  }

  public get recibirGroup() {
    return this.groupSelect.asObservable()
  }

  public enviar(employee: string): void {
    this.employeeSelect.next(employee);
  }

  public enviarGroup(group: string): void {
    this.groupSelect.next(group);
  }

  

  
}
