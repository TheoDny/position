import { Renderer2,Component, ElementRef, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FfvbService } from 'src/app/services/ffvb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  tablesSubscription !: Subscription

  classement !: HTMLElement
  journees !: HTMLElement

  constructor(private ffvbService : FfvbService,
    private _renderer2: Renderer2,
  @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    let sectionJ : HTMLElement = document.getElementById("jounrees")!
    let sectionC : HTMLElement = document.getElementById("classement")!
    sectionC.onclick = () => this.openFFVBorg()

    this.tablesSubscription = this.ffvbService.onReceiveTables().subscribe(
      (tables : any) => {
        this.classement = tables[0]
        this.journees = tables[1]
        sectionC.innerHTML = this.classement.outerHTML
        sectionJ.innerHTML = this.journees.outerHTML
        this.tablesSubscription.unsubscribe();
      },(error : any) => {
        console.error(error.message)
      }
    )
    let tables : HTMLCollectionOf<HTMLElement> | null = this.ffvbService.getTables()
    if (tables != null) {
      this.classement = tables[0]
      this.journees = tables[1]
      sectionC.innerHTML = this.classement.outerHTML
      sectionJ.innerHTML = this.journees.outerHTML
      sectionC.innerHTML = this.classement.outerHTML
      sectionJ.innerHTML = this.journees.outerHTML
    }
    let script = this._renderer2.createElement('script');
    script.text = `
    function changeCouleur(ligne){
      //ligne.bgColor = '#FFCF9F';
    }

    function remetCouleur(ligne){
      //ligne.bgColor = '#EEEEF8';
    }
    `
    this._renderer2.appendChild(this._document.body, script);

  }

  openFFVBorg(){
    window.open(this.ffvbService.getFfvborg())
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.tablesSubscription.unsubscribe();
}
}
