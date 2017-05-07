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
  infojson: any={
    "reps": []
  };
  uid: Number=1;
  pattern: string="Alphabet";
  busq: string="Google";
  pattern_: string=".*";
  local: Boolean=false
  prev: string="Google";
  prevpat: string=".*";

  constructor(public navCtrl: NavController, public infoService: InfoService) {
    this.getInfo();
  }

  getInfo(){
    /*
      Obtiene la informacion del servidor si es necesario.
     */
    if (this.local){
      this.pattern_ = ".*";
    } else {
      this.pattern_ = this.pattern;
    }
    if (this.busq!==this.prev || (this.pattern!==this.prevpat && !this.local)){
      this.getInfoCall();
    } else {
      this.filter();
    }

  }

  checkChanged(){
    /*
      Se ejecuta cuando se cambia el estado del checkbox.
      Vuelve a pedir los datos del servidor.
     */
    if (this.local){
      this.pattern_ = ".*";
    } else {
      this.pattern_ = this.pattern;
    }
    this.getInfoCall();
    this.filter();
  }

  filter(){
    /*
      Si se está trabajando en local, filtra el texto.
     */
    if (this.local){
      this.getInfo();
      this.countWords();
    }
  }

  getInfoCall(){
    /*
    Obtiene la informacion del servidor.
     */
    this.infoService.getDataPromise(this.uid, this.pattern_, this.busq, this.local)
      .subscribe(data => {
        this.info = data;
        this.infojson = data.json();
      });
  }

  countWords() {
    /*
    Cuenta el numero de repeticiones de la palabra dada.
     */
    var regexp = new RegExp(this.pattern, "ig");
    regexp.compile();
    for (let element of this.infojson.reps){
      var content = element.content;
      var result = regexp.exec(content);
      element.num = result.length;
    }
  }
}
