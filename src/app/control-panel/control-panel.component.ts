import { Component, OnInit } from '@angular/core';
import { PositionService } from '../services/position.service';
import { Context } from '../enum/context';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  context !: Context
  contextSubscription !: Subscription

  rotation !: number
  rotationSubscription !: Subscription

  constructor(private positionService: PositionService  ) {
  }

  ngOnInit(): void {
    this.contextSubscription=this.positionService.contextSubject.subscribe(
      (context : Context) => {
        this.context = context
      },(error : any) => {
        console.error(error.message);
      }
    )
    this.positionService.emitContext()

    this.rotationSubscription=this.positionService.rotationSubject.subscribe(
      (rotation : number) => {
        this.rotation = rotation
      },(error : any) => {
        console.error(error.message);
      }
    )
    this.positionService.emitRotation()
  }

  getReception(){
    this.positionService.getReceptionFromServer()
  }
  getService(){
    this.positionService.getServiceFromServer()
  }
  getAttaque(){
    this.positionService.getAttaqueFromServer()
  }
  getDefense(){
    this.positionService.getDefenseFromServer()
  }
  nextRotation(){
    this.positionService.getNextRotationFromServer()
  }
  previousRotation(){
    this.positionService.getPreviousRotationFromServer()
  }
}
