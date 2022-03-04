import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contractIstance: any;
  contractAddress = '0x2388191BEd7f5fA4a89043BD33BD3e4A828e2b94';
  contractAbi = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  num: any;

  constructor(private loginService: LoginService) { }

  async getContractInfo(){
    this.contractIstance = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.provider);
    this.num = await this.contractIstance.retrieve();
    console.log(this.num.toString());
  }

  async storeNumber() {
    this.contractIstance = new ethers.Contract(this.contractAddress, this.contractAbi, this.loginService.signer);
    await this.contractIstance.store(100);
  }

}
