import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { ProfileMenuComponent } from '../shared/profile-menu/profile-menu.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MainComponent, SidebarMenuComponent, TopMenuComponent,
    ProfileMenuComponent],
  exports: [
    SidebarMenuComponent, TopMenuComponent, ProfileMenuComponent
  ]
})
export class MainModule { }
