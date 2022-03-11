import { AuctionComponent } from './auction/auction.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: LoginPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home/auction',
    pathMatch: 'full',
    component: AuctionComponent
  }
];

@NgModule({

  declarations: [
    LoginPageComponent,
    AuctionComponent
  ],

  imports: [
    RouterModule.forRoot(routes), 
    CommonModule,
    FormsModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
