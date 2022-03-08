import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { ContractService } from './contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'EtherJs';
  //public balance = 0;
  //public formattedBalance = '';
  public userAddress: string = '';
  public show: boolean = false;

  //smartAuction
  public highestBid = 0;
  public auctionAlreadyEnded: boolean = false;
  public amount: number = 0;
  
  constructor(private loginService: LoginService, private contractService: ContractService) {}
  
  async ngOnInit() {
    //this.fetchCurrentValues();
    //da fare solo dopo aver effettuato il login
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

  //CONTRATTO SMARTAUCTION
  
  public async fetchContractValues() {
    await this.contractService.fetchCurrentValues();
    this.highestBid = this.contractService.highestBid;
    this.auctionAlreadyEnded = this.contractService.auctionAlreadyEnded;
  }

  public async bid() {
    this.contractService.bid(this.amount);
  }

  public async withdraw() {
    this.contractService.withdraw();
  }

  public async endAuction() {
    this.contractService.endAuction();
  }

}
