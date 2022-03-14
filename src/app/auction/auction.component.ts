import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  public highestBid = 0;
  public auctionAlreadyEnded: boolean = false;
  public amount: number = 0;
  public auctionTimeEnd: number = 0;
  public timeConverted: any;


  constructor(private contractService: ContractService) {}
  
  async ngOnInit() {
    this.fetchContractValues();
    this.auctionTimeEnd = await this.contractService.getTimeOfEnd();
    this.timeConverted = this.convertTime(this.auctionTimeEnd);
    for(let i = 0; i<5; i++){
      console.log(this.timeConverted[i])
    }
    
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

  public convertTime(value: number): any {
    let date = new Date(value * 1000);
    let dateValues = [
      date.getFullYear(),
      date.getMonth()+1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    return dateValues;
  }

}



