import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { ContractService } from './contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'EtherJs';
  balance = 0;
  formattedBalance = '';
  userAddress: string = '';
  show: boolean = false;

  constructor(private loginService: LoginService, private contractService: ContractService) {
  }
  

  async login() {
    this.loginService.loginWithMetamask();
    //this.balance = await this.loginService.provider.getBalance();
    //this.formattedBalance = ethers.utils.formatEther(this.balance);
  }

  showAddress() {
    this.show = true;
    this.userAddress = this.loginService.userAddress;
  }

 async readContract() {
   this.contractService.getContractInfo();
  }

 async modifyContract() {
   this.contractService.storeNumber();
 }
}
