import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FfvbService {
  url !: string;
  tables !: HTMLCollectionOf<HTMLElement>
  tablesSubject = new Subject<HTMLCollectionOf<HTMLElement>>()

  queryToRemove : string[] = ["tr td.lienquestion_pt:nth-child(1)",
                              "tr td:nth-child(1n+16)",
                              "table:nth-child(2) td:nth-child(1n+10)"
                              ]
  ffvborg : string = "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php"

  constructor(private http : HttpClient) {
    this.setUrl()
    this.receiveHTML()
  }

  setUrl(saison: string = "2021/2022", poule : string = "AMA" ,codent : string = "PTFL59",style: string = "dark-softBlue") {
    this.url= "https://get-ffvb-ranking-days.herokuapp.com?saison=" + saison + "&codent=" + codent + "&poule=" + poule +"&style="+style
    this.ffvborg += "?saison=" + saison + "&codent=" + codent + "&poule=" + poule
  }

  receiveHTML(url : string = this.url){
      this.http.get(this.url, {responseType: 'text'})
      .pipe(first())
      .subscribe((res : string) =>{
        let div = document.createElement("div")
        div.innerHTML = res
        this.tables = this.sortWantedElement(div)
        this.emitTables()
      },error =>{
        console.error(error.message)
      })
  }
  sortWantedElement(div: HTMLDivElement): HTMLCollectionOf<HTMLElement> {
    let queryRemove :string = this.queryToRemove[0]
    let ret : HTMLCollectionOf<HTMLElement> = div.getElementsByTagName("table")
    for (let i = 1; i < this.queryToRemove.length; i++) {
      queryRemove += ", " + this.queryToRemove[i];
    }
    let tdToRemove : NodeListOf<HTMLElement> = div.querySelectorAll(queryRemove)
    tdToRemove.forEach(element => element.remove())

    return ret
  }

  onReceiveTables(): Observable<any> {
    return this.tablesSubject.asObservable();
}

  getTables(): HTMLCollectionOf<HTMLElement> | null{
    return this.tables
  }

  emitTables(){
    this.tablesSubject.next(this.tables)
  }

  getFfvborg(){
    return this.ffvborg
  }
}
