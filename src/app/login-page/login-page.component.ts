import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      let success = await this.loginService.loginWithMetamask();
      if(success){
        this.router.navigate(['home/auction']);
      }
    } catch(e) {
      console.log(e);
    }
    //this.balance = await this.loginService.provider.getBalance();
    //this.formattedBalance = ethers.utils.formatEther(this.balance);
  }


}
