import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DeadlinePoliciesComponent } from './components/deadline-policies/deadline-policies.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
// import { AuthInterceptor } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    PolicyListComponent,
    ClientsComponent,
    DeadlinePoliciesComponent,
    StatisticsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
