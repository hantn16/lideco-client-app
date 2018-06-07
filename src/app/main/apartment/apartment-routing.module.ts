import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentComponent } from './apartment.component';

const routes: Routes = [{
  path: '', redirectTo: 'index', pathMatch: 'full'
}, {
  path: 'index', component: ApartmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
