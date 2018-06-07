import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SellerRoutingModule
  ],
  declarations: [SellerComponent, SellerListComponent, SellerDetailComponent],
  exports: [SellerComponent, SellerListComponent, SellerDetailComponent]
})
export class SellerModule { }
