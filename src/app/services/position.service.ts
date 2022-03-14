import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Poste } from '../models/poste.model';
import { set, DataSnapshot, get, getDatabase, ref } from 'firebase/database'
import { Context } from '../enum/context';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  position: Poste[] = [];
  positionSubject = new Subject<Poste[]>();

  systemName: string = "classique";
  systemNameSubject = new Subject<string>();

  context: Context = Context.reception ;
  contextSubject = new Subject<Context>();

  rotation:number = 1;
  rotationSubject = new Subject<number>();


  constructor() {
    this.getPositionFromServer()
  }
  ////// emitSubject //////
  emitRotation(){
    this.rotationSubject.next(this.rotation);
  }

  emitPosition(){
    this.positionSubject.next(this.position);
  }

  emitContext(){
    this.contextSubject.next(this.context);
  }

  emitAll(){
    this.emitRotation();this.emitPosition();this.emitContext()
  }

  ////// getFromServer ///////

  getPositionFromServer(){
    this.position = []
    const db = getDatabase();
    const refposition = ref(db,"/"+this.systemName+"/"+this.context+"/"+this.rotation)
    get(refposition)
    .then(
      (data: DataSnapshot) => {
        let len = 0
        if (data.val()) {

          this.position = data.val()
        }else{
          let postes =["r4","r4","central","central","passeur","libero","pointu"]; //basic
          if (this.context == Context.reception || this.context == Context.service){
            postes = ["r4","r4","central","central","passeur","libero","pointu"]
          }else  if (this.context == Context.defence || this.context == Context.attaque){
            postes = ["r4","r4","central","attaque","passeur","libero","pointu"]
          }

          for (let i = 0; i < 7-len; i++) {
            this.position.push(new Poste(0,0,postes[i]));
          }
        }
        this.emitAll()
      }, (error) => {
       console.error(error.message);
      }
    );

  }
  // clear position //
  clearPosition(){
    return new Promise((resolve, reject) => {
      try {
        const db = getDatabase()
        const refToSet = ref(db,"/"+this.systemName+"/"+this.context.toString()+"/"+this.rotation)
        resolve( set(refToSet,null) )
      }catch (error) {
        console.error(error)
        reject(error);
      }
    })
  }

  // changeRotation //

  getNextRotationFromServer(){
    if ( this.rotation == 6 ) {
      this.rotation = 1
    } else {
      this.rotation = this.rotation+1
    }
    this.getPositionFromServer()
    while ( this.position == undefined ){
      this.getPreviousRotationFromServer()
    }
  }
  getPreviousRotationFromServer(){
    if ( this.rotation == 1 ) {
      this.rotation = 6
    } else {
      this.rotation = this.rotation-1
    }
    this.getPositionFromServer()
    while ( this.position == undefined ){
      this.getPreviousRotationFromServer()
    }
  }

  // changeContext //

  getReceptionFromServer() {
    this.context = Context.reception
    this.getPositionFromServer()
  }
  getServiceFromServer() {
    this.context = Context.service
    this.getPositionFromServer()
  }
  getAttaqueFromServer() {
    this.context = Context.attaque
    this.getPositionFromServer()
  }
  getDefenseFromServer() {
    this.context = Context.defence
    this.getPositionFromServer()
  }
  ///// setPosition //////
  setPositionToServer() {
    return new Promise((resolve, reject) => {
      try {
        const db = getDatabase()
        const refToSet = ref(db,"/"+this.systemName+"/"+this.context.toString()+"/"+this.rotation)
        resolve( set(refToSet,this.position) )
      }catch (error) {
        console.error(error)
        reject(error);
      }
    })
  }

  addJoueur(poste : Poste){
    try {
      this.position.push(poste)
      this.emitPosition()
    }catch (e) {
      console.error(e)
    }
  }
}
