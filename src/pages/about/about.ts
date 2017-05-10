import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {InfoService} from '../../infoService';
import {Response} from '@angular/http';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  info: Response;
  infojson: any = {
    "reps": []
  };
  uid: Number = 1;
  pattern: string = "Alphabet";
  busq: string = "Google";
  pattern_: string = ".*";
  local: Boolean = true;
  forced: Boolean = true;
  prev: string = "Google";
  prevpat: string = ".*";
  subs: Subscription;
  observable: Observable<string>;
  observer: Observer<string>;
  locked: Boolean = false;
  resultados: number = 10;
  coincidencias: number=10;

  constructor(public navCtrl: NavController, public infoService: InfoService) {
    this.getInfo();
  }

  timeoutCall() {
    /*
     Llamada con timeout y con "candado" para evitar que se sature el servidor.
     */
    if (!this.locked) {
      this.locked = true;
      setTimeout(() => {
        this.getInfoCall();
      });
    }
    ;
  }

  getInfo() {
    /*
     Obtiene la informacion del servidor si es necesario.
     */

    this.setPattern();

    var busqueda_cambiada = this.busq !== this.prev;
    var patron_cambiado = (this.pattern !== this.prevpat) && (!this.local);

    if (busqueda_cambiada || patron_cambiado || this.forced) {
      this.timeoutCall();
    }

  }

  setPattern() {
    if (this.local) {
      this.pattern_ = ".*";
    } else {
      this.pattern_ = this.pattern;
    }
  }

  checkChanged() {
    /*
     Se ejecuta cuando se cambia el estado del checkbox.
     Vuelve a pedir los datos del servidor.
     */
    this.forced = true;
    this.setPattern();
    this.getInfo();
  }

  scrollChanged() {
    /*
        Se comprueba si esta bloqueado para evitar que se produzcan muchas llamadas.
    */
    if (!this.locked) {
      this.getInfo();
    }
    ;
  }

  filter() {
    /*
     Si se está trabajando en local, filtra el texto.
     */
    if (this.local) {
      this.countWords();
    }
  }

  update() {
    if (this.local) {
      this.filter();
    } else {
      this.getInfo();
    }
  }

  getInfoCall() {
    /*
     Obtiene la informacion del servidor sin timeouts (recomendado solo para cambios puntuales (checkbox)).
     */
    this.infoService.getDataPromise(this.uid, this.pattern_, this.busq, this.local, this.resultados)
      .subscribe(data => {
        this.info = data;
        this.infojson = data.json();
        this.forced = false;
        this.locked = false;
        this.filter();
      });
  }

  countWords() {
    /*
     Cuenta el numero de repeticiones de la palabra dada.
     */
    if (!this.locked && this.pattern.length>0){
      this.locked = true;
      var regexp = new RegExp(this.pattern.toLowerCase(), "mgi");
      regexp = regexp.compile();
      var max=0;
      for (let element of this.infojson.reps) {
        var content = element.content;
        var result;
        var amount = 0;
        do{
          amount += 1;
          result = regexp.exec(content);
          if (amount>5000) {
            break;
          }
        } while (result);
        element.amount = amount;
        if (element.amount>max){
            max=element.amount;
        }
      }
      this.coincidencias = max; 
      this.locked = false;
    }
  }

}
