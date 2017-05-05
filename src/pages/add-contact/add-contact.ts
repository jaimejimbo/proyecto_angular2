import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html'
})

export class AddContactPage {
  contactList: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.contactList = af.database.list('/contacts');
  }

  addContact(name, address, phone, city) {
    this.contactList.push({
      name: name,
      address: address,
      phone: phone,
      city: city
    }).then( newContact => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
  }
}
