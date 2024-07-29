import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DeadlinePoliciesComponent } from './components/deadline-policies/deadline-policies.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NewPolicyComponent } from './components/new-policy/new-policy.component';
import { AddPolicyComponent } from './components/add-policy/add-policy.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    PolicyListComponent,
    ClientsComponent,
    DeadlinePoliciesComponent,
    StatisticsComponent,
    NewPolicyComponent,
    AddPolicyComponent,
    ProfileComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  
  providers: [
    provideClientHydration(),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
