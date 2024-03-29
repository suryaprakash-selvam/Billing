import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { BillingComponent } from './billing/billing.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { productprice } from './services/getproduct.service';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import { UpdateAvailabilityComponent } from './update-availability/update-availability.component';
@NgModule({
  declarations: [
    AppComponent,
    NewproductComponent,
    BillingComponent,
    UpdateAvailabilityComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule


  ],
  providers: [ConfirmationService,MessageService,productprice],
  bootstrap: [AppComponent]
})
export class AppModule { }
