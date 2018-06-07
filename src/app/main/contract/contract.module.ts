import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

@NgModule({
  imports: [
    CommonModule,
    ContractRoutingModule
  ],
  declarations: [ContractComponent]
})
export class ContractModule { }
