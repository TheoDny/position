import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Context } from 'src/app/enum/context';
import { Poste } from 'src/app/models/poste.model';
import { SystemeService } from 'src/app/services/systeme.service';

@Component({
  selector: 'app-systeme-view',
  templateUrl: './systeme-view.component.html',
  styleUrls: ['./systeme-view.component.scss']
})
export class SystemeViewComponent implements OnInit,OnDestroy {

  systeme !: Poste[][];
  systemeSubscription !: Subscription;


  context !: Context;
  contextSubscription !: Subscription;

  constructor( private systemeService: SystemeService) {}

  ngOnInit(): void {

    this.systemeSubscription=this.systemeService.systemeSubject.subscribe(
      (systeme : Poste[][]) => {
        this.systeme = systeme
      },(error : any) => {
        console.error(error.message);
      }
      )
      this.systemeService.emitSysteme()

      this.contextSubscription=this.systemeService.contextSubject.subscribe(
        (context : Context) => {
          this.context = context
        },(error : any) => {
          console.error(error.message);
        }
        )
        this.systemeService.emitContext()
  }

  ngOnDestroy() {
    this.systemeSubscription.unsubscribe();
    this.contextSubscription.unsubscribe();
  }
  getReception(){
    this.systemeService.context = Context.reception;
    this.systemeService.getSystemeFromServer()
  }
  getService(){
    this.systemeService.context = Context.service;
    this.systemeService.getSystemeFromServer()
  }
  getAttaque(){
    this.systemeService.context = Context.attaque;
    this.systemeService.getSystemeFromServer()
  }
  getDefense(){
    this.systemeService.context = Context.defence;
    this.systemeService.getSystemeFromServer()
  }
}
