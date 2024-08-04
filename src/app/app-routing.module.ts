import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }, // Ana yol için yönlendirme
  { path: 'main-page', component: MainPageComponent },
  { path: 'login', component: LoginComponent } // Login rotası

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
