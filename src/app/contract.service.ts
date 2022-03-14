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

  readonly contractAddress = '0xC26d6619f750703c384C0c19FF426648477e343A';
  readonly contractAbi = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AuctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HighestBidIncreased","type":"event"},{"inputs":[],"name":"auctionAlreadyEnded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTimeOfEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestBid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}]
  
  constructor(private loginService: LoginService) { }

  public async fetchCurrentValues() {
    try {
      this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.Provider());
      this.highestBid =  await this.smartAuction.highestBid() / this.ehtPrecision;
      this.auctionAlreadyEnded = await this.smartAuction.auctionAlreadyEnded();
    } catch(ex) {
      console.error("exeption while fetching current values", ex);
      alert('You have to connect your wallet');
    }
  }

  public async bid(amount: number) {
    try {
      this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.Signer());
      let amountConverted: string = (amount).toString();
      await this.smartAuction.bid({
        from: this.loginService.userAddress.value, 
        value: parseUnits(amountConverted),
        gasPrice: this.loginService.Provider().getGasPrice(),
        gasLimit: ethers.utils.hexlify(100000)
      });
    } catch(ex) {
      console.error("exeption while placing the bid", ex);
      alert('Bid was not placed');
    } //capire come fare ad avere l'errore che viene ritornato dallo smart contract
  }

  public async withdraw() {
    try {
      this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.Signer());
      let ret = await this.smartAuction.withdraw({
        from: this.loginService.userAddress.value
      });
      console.log(ret);
    }catch (ex) {
      console.error("exeption while withrawing", ex);
      alert('Withdraw not completed');
    }
  }

  public async endAuction() {
    try {
      this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.Signer());
      await this.smartAuction.endAuction();
    } catch (ex) {
      console.error("exeption while ending auction", ex);
      alert('Auction not ended');
    }
  }
  
  public async getTimeOfEnd() {
    try {
      this.smartAuction = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.Provider());
      return await this.smartAuction.getTimeOfEnd();
    } catch (ex) {
      console.error("exeption while ending auction", ex);
      alert('Auction not ended');
    }
    return;
  }
}