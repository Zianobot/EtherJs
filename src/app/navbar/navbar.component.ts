import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public addressConnected: string = '';
  public isConnected: boolean = false;

  constructor(private loginService:LoginService, private router: Router) {
    
    this.loginService.isUserLoggedIn.subscribe( value => {
      this.isConnected = value;
    }),
    
    this.loginService.userAddress.subscribe( value => {
      let startAddress = value.substring(0,5);
      let endAddress = value.substring(37);
      this.addressConnected = startAddress + ' ..... ' + endAddress;
    })
   }

  ngOnInit(): void {
  
  }

  async login() {
    await this.loginService.loginWithMetamask();
    this.router.navigate(['home/auction']); 
  }

  logout() {
    this.loginService.userAddress.next('');
    this.loginService.isUserLoggedIn.next(false);
    this.router.navigate(['home']);
  }

}


