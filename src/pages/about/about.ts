import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoService } from '../../infoService';
import { Response } from '@angular/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  info: Response;
  uid: Number=1;
  pattern: String="Alphabet";
  busq: String="Google";
  pattern_: String=".*";
  local: Boolean=false
  prev: String="Google";
  prevpat: String=".*";

  constructor(public navCtrl: NavController, public infoService: InfoService) {
    this.getInfo();
  }

  getInfo(){
    if (this.local){
      this.pattern_ = ".*";
    } else {
      this.pattern_ = this.pattern;
    }
    if (this.busq!==this.prev || (this.pattern!==this.prevpat && !this.local)){
      this.getInfoCall();
    }
  }

  checkChanged(){
    if (this.local){
      this.pattern_ = ".*";
    } else {
      this.pattern_ = this.pattern;
    }
    this.getInfoCall();
    this.filter();
  }

  getInfoCall(){
    this.infoService.getDataPromise(this.uid, this.pattern_, this.busq)
      .subscribe(data => {
        this.info = data.json();
      });
  }

}
