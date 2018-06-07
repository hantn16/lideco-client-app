import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
      { path: 'apartment', loadChildren: './apartment/apartment.module#ApartmentModule' },
      { path: 'seller', loadChildren: './seller/seller.module#SellerModule' },
      { path: 'contract', loadChildren: './contract/contract.module#ContractModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
