import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  provider: any;
  signer: any;
  
  userAddress: any;
 
  constructor() { }

  async loginWithMetamask() {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
        // MetaMask requires requesting permission to connect users accounts
    await this.provider.send("eth_requestAccounts", []);
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
    this.signer = this.provider.getSigner();
    this.userAddress = await this.signer.getAddress(); //prendo l'address del wallet che fa il login
    console.log(this.userAddress);
  }
}
