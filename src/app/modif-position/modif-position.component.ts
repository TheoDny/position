import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Context } from '../enum/context';
import { Poste } from '../models/poste.model';
import { PositionService } from '../services/position.service';

@Component({
  selector: 'app-modif-position',
  templateUrl: './modif-position.component.html',
  styleUrls: ['./modif-position.component.scss']
})
export class ModifPositionComponent implements OnInit {

  context !: Context
  contextSubscription ?: Subscription

  rotation !: number
  rotationSubscription ?: Subscription

  position !: Poste[]
  positionSubscription ?: Subscription

  mousedownTerrain!: Observable<MouseEvent>;
  mousedownTerrainSubscription!: Subscription;

  mouseupTerrain!: Observable<MouseEvent>;
  mouseupTerrainSubscription!: Subscription;

  mousedownNewJoueur!: Observable<MouseEvent>;
  mousedownNewJoueurSubscription!: Subscription;

  mouseupGeneral!: Observable<MouseEvent>;;
  mouseupGeneralSubscription!: Subscription;

  mouseJoueurFollow !: Observable<MouseEvent>;
  mouseJoueurFollowSubscription!: Subscription;

  isAdding = false
  typePoste !: string;

  boxPhantomJoueur :any
  boxTerrain : any
  boxAll : any

  message : string = "";
  errorMessage : string = "";

  constructor(private positionService: PositionService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.positionSubscription=this.positionService.positionSubject.subscribe(
      (position : Poste[]) => {
        this.position = position
      },(error : any) => {
        console.error(error.message);
      }
    )

    this.rotationSubscription=this.positionService.rotationSubject.subscribe(
      (rotation : number) => {
        this.rotation = rotation
      },(error : any) => {
        console.error(error.message);
      }
    )

    this.contextSubscription=this.positionService.contextSubject.subscribe(
      (context : Context) => {
        this.context = context
      },(error : any) => {
        console.error(error.message);
      }
    )
    this.positionService.emitAll()
  }

  setPositionToServer(){
    this.positionService.setPositionToServer().then(() => {
      this.displaySuccessMessage5s("Position : "+this.context.toString()+" "+this.rotation+" modifié")
    }).catch((error) => {
      this.displayErrorMessage5s(error.message)
    })
  }

  clearPosition(){
    this.positionService.clearPosition()
    this.positionService.getPositionFromServer()
  }

  displaySuccessMessage5s(message : string){
    this.message=message
    setTimeout(() => {this.message=""},5000)
  }
  displayErrorMessage5s(message : string){
    this.errorMessage=message
    setTimeout(() => {this.message=""},5000)
  }
}
