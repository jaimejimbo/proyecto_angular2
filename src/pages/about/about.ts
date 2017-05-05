import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoService } from '../../infoService';
import { Response } from '@angular/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  info: Response=undefined;

  constructor(public navCtrl: NavController, public infoService: InfoService) {
    this.getInfo();
  }

  getInfo(){
    this.infoService.getDataPromise()
      .subscribe(data => {
        this.info = data;
      });
  }

}
