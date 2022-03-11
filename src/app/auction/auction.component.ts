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
  
  constructor(private contractService: ContractService) {}
  
  async ngOnInit() {}


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



