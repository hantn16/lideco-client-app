import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractComponent } from './contract.component';

const routes: Routes = [{
  path: '', redirectTo: 'index', pathMatch: 'full'
}, {
  path: 'index', component: ContractComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
