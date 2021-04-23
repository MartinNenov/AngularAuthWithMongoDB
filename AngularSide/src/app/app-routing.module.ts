import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'success', component: SuccessComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
