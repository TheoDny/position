import { Injectable, OnInit } from '@angular/core';
import { DataSnapshot, get, getDatabase, ref } from 'firebase/database';
import { Subject } from 'rxjs';
import { Context } from '../enum/context';
import { Poste } from '../models/poste.model';


@Injectable({
  providedIn: 'root'
})
export class SystemeService {

  systemeSubject = new  Subject<Poste[][]>()
  systeme: Poste[][] = [] ;

  contextSubject = new  Subject<Context>()
  context : Context = Context.reception

  systemName : string = "classique"

  rotation : number = 1


  constructor() {
    this.getSystemeFromServer()
  }

  emitSysteme() {
    this.systemeSubject.next(this.systeme)
  }
  emitContext(){
    this.contextSubject.next(this.context)
  }
  emitAll() {
    this.emitContext();this.emitSysteme()
  }

  getSystemeFromServer(){
    this.systeme = []
    const db = getDatabase();
    const refposition = ref(db,"/"+this.systemName+"/"+this.context)
    get(refposition)
    .then(
      (data: DataSnapshot) => {
        let len = 0
        if (data.val()) {
          this.systeme = data.val().slice(1)
        }
        this.emitAll()
      }, (error) => {
       console.error(error.message);
      }
    );
  }

}
