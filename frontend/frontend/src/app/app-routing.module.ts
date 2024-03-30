import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KvizComponent } from './kviz/kviz.component';
import { LoginComponent } from './login/login.component';
import { KvizHomepageComponent } from './kviz-homepage/kviz-homepage.component';

const routes: Routes = [
  { path: "quiz/questions", component: KvizComponent },
  { path: "login", component: LoginComponent },
  { path: "quiz", component: KvizHomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
