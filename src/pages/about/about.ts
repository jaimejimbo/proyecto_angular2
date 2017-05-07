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

  constructor(public navCtrl: NavController, public infoService: InfoService) {
    this.getInfo();
  }

  getInfo(){
    this.infoService.getDataPromise(this.uid, this.pattern, this.busq)
      .subscribe(data => {
        this.info = data.json();
      });
  }

}
