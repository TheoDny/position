import { Component, Input, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Poste } from 'src/app/models/poste.model';

const IMG_W_ON_H : number = 1.3359
const BASE_WIDTH_TERRAIN : number = 600

@Component({
  selector: 'app-terrain-item',
  templateUrl: './terrain-item.component.html',
  styleUrls: ['./terrain-item.component.scss']
})
export class TerrainItemComponent implements OnInit,OnDestroy {

  @Input() position !: Poste[]

  observeResizeTerrain !: ResizeObserver;
  scale = 1

  constructor(private terrain : ElementRef,private renderer : Renderer2) {}

  ngOnInit(): void {
    // To handle resizing of app-terrain //
    this.observeResizeTerrain = new ResizeObserver(()=>this.onResize(this.terrain))
    this.observeResizeTerrain.observe(this.terrain.nativeElement)
  }

  onResize (terrain : ElementRef): void {
    this.renderer.setStyle(terrain.nativeElement, "height", terrain.nativeElement.offsetWidth * IMG_W_ON_H + "px")
    this.scale=this.calculeScaling(terrain.nativeElement)
  }

  calculeScaling(terrainHTML : HTMLElement) : number {
       return terrainHTML.offsetWidth / BASE_WIDTH_TERRAIN
  }

  ngOnDestroy(): void {
    this.observeResizeTerrain.unobserve(this.terrain.nativeElement)
  }
}
