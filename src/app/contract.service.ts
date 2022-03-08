import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contractIstance: any;
/*
  readonly contractAddress = '0x2388191BEd7f5fA4a89043BD33BD3e4A828e2b94';
  readonly contractAbi = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]
*/

  readonly contractAddress = '0x3601C5007Fcbaf7200ece3BfDc61c5578961ad80';
  readonly contractAbi = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HighestBidIncreased","type":"event"},{"inputs":[],"name":"auctionAlreadyEnded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"highestBid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}]
  num: any;
  
  constructor(private loginService: LoginService) { 
    
  }
/*
  async getContractInfo() {
    this.contractIstance = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.provider);
    this.num = await this.contractIstance.retrieve();
    console.log(this.num.toString());
  }

  async storeNumber() {
    this.contractIstance = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.signer);
    await this.contractIstance.store(100);
  }
*/
}
