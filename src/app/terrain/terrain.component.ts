import { Component, OnInit, Renderer2, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Poste } from '../models/poste.model';
import { PositionService } from '../services/position.service';

const IMG_W_ON_H : number = 1.3359
const BASE_WIDTH_TERRAIN : number = 600

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit,OnDestroy {

  urlTerrain: string = 'https://firebasestorage.googleapis.com/v0/b/volley-position.appspot.com/o/terrain-volley-shema%20-%20Copie.png?alt=media&token=ca398c47-02d0-4892-9cd4-04bc1001011a'
  position !: Poste[]
  positionSubscription ?: Subscription

  lockPosition = true;
  terrainHTML !: HTMLElement
  observeResizeTerrain !: ResizeObserver 
  scale = 1
  constructor(private terrain : ElementRef,private positionService: PositionService) {
  }


  ngOnInit(): void {
    // To handle resizing of app-terrain //
    this.observeResizeTerrain = new ResizeObserver(()=>this.onResize())
    this.observeResizeTerrain.observe(this.terrain.nativeElement)

    // Subscription //
    this.positionSubscription=this.positionService.positionSubject.subscribe(
      (position : Poste[]) => {
        this.position = position
      },(error : any) => {
        console.error(error.message);
      }
    )
    this.positionService.emitAll()
  }

  ngOnDestroy(): void {
    this.positionSubscription?.unsubscribe()
    this.observeResizeTerrain.unobserve(this.terrain.nativeElement)
  }

  onResize () : void {
    let terrainHTML = document.querySelector("app-terrain") as HTMLElement
    terrainHTML.style.height = terrainHTML.offsetWidth * IMG_W_ON_H + "px"
    this.scale=this.calculeScaling(terrainHTML)
  }

  calculeScaling(terrainHTML : HTMLElement) : number {
       return terrainHTML.offsetWidth / BASE_WIDTH_TERRAIN
  }

  lockUnlock(event:any ){
    this.lockPosition = !this.lockPosition
    if( this.lockPosition ){
      (event.target as HTMLElement).innerText="Unlock"
    }else{
      (event.target as HTMLElement).innerText="Lock"
    }

  }

  onDragStarted(event:any){
    let element = event.source.getRootElement();
    element.style.transform="none"
  }

  onDragEnded(event : any) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let coord = this.position[((element.id as string).slice(-1) as any)]
    coord.x= boundingClientRect.x*(2-this.scale)  - parentPosition.left
    coord.y= boundingClientRect.y*(2-this.scale)  + - parentPosition.top
  }

  getPosition(el : any) {
    let x = 0;
    let y = 0;

    let scrollTopGlobal =0
    let scrollLeftGlobal =0
    if (document.scrollingElement?.scrollTop) {
      scrollTopGlobal = document.scrollingElement.scrollTop
    }
    if (document.scrollingElement?.scrollLeft) {
      scrollLeftGlobal = document.scrollingElement.scrollTop
    }
    x = el.offsetLeft
    y = el.offsetTop

    return { top: y - scrollTopGlobal, left: x - scrollLeftGlobal};
  }

}
