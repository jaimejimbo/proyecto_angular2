import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddContactPage } from '../add-contact/add-contact';
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.contactList = af.database.list('/contacts');
  }


  addContact(){
    this.navCtrl.push(AddContactPage);
  }
  
  deleteContact(contact){
    this.contactList.remove(contact);
  }
  
  editContact(contact){
    this.navCtrl.push(AddContactPage, {
      key: contact.$key,
      name: contact.name,
      address: contact.address,
      phone: contact.phone,
      city: contact.city
    });
  }

}
