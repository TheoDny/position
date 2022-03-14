import { Component, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Poste } from '../models/poste.model';



@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss'],
})
export class JoueurComponent implements OnInit {

  @Input()poste!: Poste;

  showPrompt = false;
  eventDbClick = false;

  constructor(private readonly viewRef: ViewContainerRef) {
}

  ngOnInit(): void {
    let element = this.viewRef.element.nativeElement.parentNode
    let again : boolean = true
    while ( (element.nodeName != "APP-MODIF-POSITION" )&& again ) {
      element = element.parentNode;
      if (element.nodeName == "APP-ROOT"){
        again=false;
      }
    }
    if (again) {
      this.eventDbClick = true;
    }
  }



  @HostListener('dblclick', ['$event.target'])
  onDbClick() {
    if (this.eventDbClick) {
      this.openPrompt()
    }
 }

  closePrompt(){
    this.showPrompt =false
  }

  openPrompt() {
    this.showPrompt = true;
  }
}


