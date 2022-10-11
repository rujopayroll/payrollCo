import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})


export class AppComponent {
  title = 'payrollCO';

  constructor(private primengConfig: PrimeNGConfig) { }
  
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
