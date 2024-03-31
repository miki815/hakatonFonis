import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { KvizComponent } from './kviz/kviz.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LearnComponent } from './learn/learn.component';
import { RegisterComponent } from './register/register.component';
import { KvizHomepageComponent } from './kviz-homepage/kviz-homepage.component';
import { ConnestionsComponent } from './connestions/connestions.component';
import { MyConnectionsComponent } from './my-connections/my-connections.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: "quiz/questions", component: KvizComponent },
  { path: "login", component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'register', component: RegisterComponent },
  { path: "quiz", component: KvizHomepageComponent },
  { path: "connestions", component: ConnestionsComponent },
  { path: "myconnections", component: MyConnectionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }