import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private smartAuction: any;
  private ehtPrecision = 10 ** 18;
  
  public highestBid = 0;
  public auctionAlreadyEnded: boolean = false;

  readonly contractAddress = '0x3601C5007Fcbaf7200ece3BfDc61c5578961ad80';
  readonly contractAbi = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HighestBidIncreased","type":"event"},{"inputs":[],"name":"auctionAlreadyEnded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"highestBid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}];

  constructor(private loginService: LoginService) {}

  public async fetchCurrentValues() {
    this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.provider);
    this.highestBid =  await this.smartAuction.highestBid() / this.ehtPrecision;
    this.auctionAlreadyEnded = await this.smartAuction.auctionAlreadyEnded();
  }

  public async bid(amount: number) {
    this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.signer);
    let amountConverted: string = (amount).toString();
    await this.smartAuction.bid({
      from: this.loginService.userAddress, 
      value: parseUnits(amountConverted),
      gasPrice: this.loginService.provider.getGasPrice(),
      gasLimit: ethers.utils.hexlify(100000)
    });
  }

  public async withdraw() {
    this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.signer);
    await this.smartAuction.withdraw({
      from: this.loginService.userAddress
    });
  }

  public async endAuction() {
    this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.signer);
    await this.smartAuction.endAuction();
  } 
}