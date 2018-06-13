import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileMenuComponent } from './shared/profile-menu/profile-menu.component';
import { SellerService } from './main/seller/seller.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './core/guards/auth.guard';
import { httpInterceptorProviders } from './core/interceptors';
import { HttpClientModule } from '@angular/common/http';
import { ChooseImageComponent } from './shared/choose-image/choose-image.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ChooseImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TableModule, DialogModule, ButtonModule, InputTextModule, FileUploadModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    SellerService,
    httpInterceptorProviders
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TableModule, DialogModule, ButtonModule, InputTextModule, FileUploadModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
