import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class InfoService {
  http: Http;
  data: Response;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  retrieveData() {
    //Poner aqui la página de la que se obtienen datos de python.
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('body', '');

    this.http.get('https://www.google.es', headers)
      .subscribe(data => {
        this.data = data;
      });
  }

  getData() {
    return this.data;
  }

  getDataPromise(){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('body', '');

    return this.http.get('https://www.google.es', headers);
  }
}
