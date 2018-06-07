import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerListComponent } from './seller-list/seller-list.component';

const routes: Routes = [{
  path: '', redirectTo: 'index', pathMatch: 'full'
}, {
  path: 'index', component: SellerListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
