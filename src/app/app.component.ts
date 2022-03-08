import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { ContractService } from './contract.service';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

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

  //smartAuction
  public highestBid = 0;
  
  public amount: number = 0;
  public auctionAlreadyEnded: boolean = false;

  private ehtPrecision = 10 ** 18;
  private smartAuction: any;
  private account: any;


  constructor(private loginService: LoginService, private contractService: ContractService) {}
  
  async ngOnInit() {
    
    //this.fetchCurrentValues();

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
/*
 async readContract() {
   this.contractService.getContractInfo();
  }

 async modifyContract() {
   this.contractService.storeNumber();
 }

*/

  //contratto smartAuction

  public async fetchCurrentValues() {
      this.smartAuction = new ethers.Contract(this.contractService.contractAddress, this.contractService.contractAbi, this.loginService.provider);
      this.highestBid =  await this.smartAuction.highestBid() / this.ehtPrecision;
      this.auctionAlreadyEnded = await this.smartAuction.auctionAlreadyEnded();
  }

  public async bid() {
    this.smartAuction = new ethers.Contract(this.contractService.contractAddress, this.contractService.contractAbi, this.loginService.signer);
    let amountConverted: string = (this.amount).toString();
    await this.smartAuction.bid({
      from: this.loginService.userAddress, 
      value: parseUnits(amountConverted),
      gasPrice: this.loginService.provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(100000)
    });
  }

  public async withdraw() {
    this.smartAuction = new ethers.Contract(this.contractService.contractAddress, this.contractService.contractAbi, this.loginService.signer);
    let withdrawSuccess = await this.smartAuction.withdraw({
      from: this.loginService.userAddress
    });
    console.log(withdrawSuccess);
  }

  endAuction() {

  }

}
