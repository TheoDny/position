import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Poste } from 'src/app/models/poste.model';

@Component({
  selector: 'app-prompt-joueur',
  templateUrl: './prompt-joueur.component.html',
  styleUrls: ['./prompt-joueur.component.scss']
})
export class PromptJoueurComponent implements OnInit {


  @Input() poste !: Poste;
  @Input()  showPrompt !: boolean;

  @Output() showPromptChange = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  setAvant(){
    this.poste.avant=true
  }

  setArriere(){
    this.poste.avant=false
  }

  close(){
    this.showPrompt= false;
    this.showPromptChange.emit(this.showPrompt)
  }

}
