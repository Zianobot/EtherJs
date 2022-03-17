import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  private provider: any; 
  private signer: any; 
  public userAddress: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }


  private getAccounts = async () => {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      return await this.provider.send("eth_requestAccounts", []);
    } catch (e) {
      console.error(e);
    }
  }

  async loginWithMetamask() {
    // MetaMask requires requesting permission to connect users accounts
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const accounts = await this.getAccounts().catch( (e:any) => {
      console.error(e.messagge);
      return false;
    })

    if(!accounts){
      alert('No address found');
      return false;
    }

    this.signer = this.provider.getSigner();

    const address = await this.signer.getAddress(); //prendo l'address del wallet che fa il login
    this.userAddress.next(address);
    this.isUserLoggedIn.next(true);
    console.log(this.userAddress.value);
    return true;
  }

  public Provider() {
    return this.provider;
  }

  public Signer() {
    return this.signer;
  }

}
