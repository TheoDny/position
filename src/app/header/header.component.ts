import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {getAuth} from '@firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    getAuth().onAuthStateChanged(
      (user: any) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  signOut(): void {
    this.authService.signoutUser()
  }

}
