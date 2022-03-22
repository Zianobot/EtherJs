import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'ethers';
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

  public offersList: Array<object> = [];

  public ehtPrecision = 10 ** 18;

  public offersAddresses: Array<string> = [];
  public offersAmount: Array<number> = [];

  public countdownSeconds: string = '';
  public countdownMinutes: string = '';  
  public countdownHours: string = '';
  public countdowndays: string = '';
  public countdownEnded: string = '';
  public auctionTimeAlreadyEnded: boolean = false;


  constructor(private contractService: ContractService) {
  }
  
  async ngOnInit() {
    await this.fetchContractValues();
    this.auctionTimeEnd = await this.contractService.getTimeOfEnd();
    this.timeConverted = this.convertTime(this.auctionTimeEnd);
    this.countdown(this.timeConverted);
    this.getAllOffers();
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
    return date;
  }

  public countdown(date: number) {
    let myfunc = setInterval(() => {

      let now = new Date().getTime();
      let timeleft = date - now;
          
      // Calcolo i giorni, le ore, i minuti e i secondi che mancano
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
          
      this.countdowndays = days + "d "
      this.countdownHours = hours + "h " 
      this.countdownMinutes= minutes + "m " 
      this.countdownSeconds = seconds + "s " 
          
      // Quando finisce il countdown
      if (timeleft < 0) {
          clearInterval(myfunc);
          this.countdowndays  = ""
          this.countdownHours = "" 
          this.countdownMinutes = ""
          this.countdownSeconds = ""
          this.countdownEnded = "TEMPO FINITO";
          this.auctionTimeAlreadyEnded = true;
          if(!this.auctionAlreadyEnded) {
            this.endAuction();
          }
      }
      }, 1000);
  }

  public async getAllOffers() {
    this.offersList =  await this.contractService.getAllOffers();
    this.offersList.forEach(element => {
      this.offersAddresses.push(Object.values(element)[0]);
      this.offersAmount.push(Object.values(element)[1]);
    });
    }
}



