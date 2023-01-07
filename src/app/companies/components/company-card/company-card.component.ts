import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html'
})
export class CompanyCardComponent implements OnInit {

  empresaseleccionada: any[] = [];
  token!: string;
  @Input() company: any = {};
  @Input() index: any;

  @Output() public companySelect: EventEmitter<any>;
  

  constructor( private router: Router,
               public _modalUploadService: ModalUploadService ) { 

    this.companySelect = new EventEmitter();
  
  }

  ngOnInit(): void {
  }

  verCompany(){

    // this.router.navigate( ['/employee',this.index] );
   this.companySelect.emit({empresa: this.index, empresa1: this.company});
  }

   ingresar(){
       this.companySelect.emit({empresa: this.company, id: this.index});
       this.guardarempresa();
    }

    guardarempresa(){
      localStorage.setItem('empresaseleccionada', JSON.stringify(this.company));
    }

}