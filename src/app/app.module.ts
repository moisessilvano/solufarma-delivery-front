import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditDeliveryModalComponent } from './modals/edit-delivery-modal/edit-delivery-modal.component';

const config: SocketIoConfig = {
  url: environment.apiUrl,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DeliveriesComponent,
    DeliveryComponent,
    NavbarComponent,
    EditDeliveryModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditDeliveryModalComponent
  ]
})
export class AppModule { }
