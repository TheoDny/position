import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router) {}

  signinUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.signInWithEmailAndPassword(firebase.getAuth(),email, password)
      .then(() => {
          console.info("login")
          this.router.navigate(["systeme"])
          resolve()
        },
        (error: any) => {
          reject(error)
        }
      )
    })
  }

  signoutUser() {
    console.info("logout")
    firebase.signOut(firebase.getAuth())
    this.router.navigate(["auth","login"])
  }

}
