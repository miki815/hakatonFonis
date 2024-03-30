import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KvizComponent } from './kviz/kviz.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "kviz", component: KvizComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
