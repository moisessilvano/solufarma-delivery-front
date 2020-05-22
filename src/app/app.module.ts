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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditDeliveryModalComponent } from './modals/edit-delivery-modal/edit-delivery-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { HttpsRequestInterceptor } from './interceptors/https-request.interceptor';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { MotoboyComponent } from './pages/motoboy/motoboy.component';
import { NgxLoadingModule } from 'ngx-loading';
import { JwtModule } from "@auth0/angular-jwt";
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { DecimalPipe } from '@angular/common';

const config: SocketIoConfig = {
  url: environment.apiUrl,
};

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DeliveriesComponent,
    DeliveryComponent,
    NavbarComponent,
    EditDeliveryModalComponent,
    UsersComponent,
    EditUserModalComponent,
    MotoboyComponent,
    UploadModalComponent
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
    NgbModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: [],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CurrencyMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditDeliveryModalComponent,
    EditUserModalComponent,
    UploadModalComponent
  ]
})
export class AppModule { }
