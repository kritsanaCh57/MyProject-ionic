import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform
  ) {
  }

  fb = {
    loggedIn: true,
    name: '',
    email: '',
    profilePicture: ''
  };



  loginwithfb() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          this.fb.loggedIn = true;
          this.fb.email = res.user.email;
          this.fb.name = res.user.displayName,
          this.fb.profilePicture = res.user.photoURL
        });
    }
  }


  /*facebook = {
    loggedIn : false,
    name : '',
    email : '',
    profilePicture: ''
  }; 

  

  loginwithfb() {
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      this.facebook.loggedIn = true;
      this.facebook.email = res.user.email;
      this.facebook.name = res.user.displayName,
      this.facebook.profilePicture = res.user.photoURL
    })
    this.navCtrl.setRoot(TabsPage);
  }*/
}
