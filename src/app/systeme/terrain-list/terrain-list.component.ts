import { Component, Input, OnInit } from '@angular/core';
import { Poste } from 'src/app/models/poste.model';

@Component({
  selector: 'app-terrain-list',
  templateUrl: './terrain-list.component.html',
  styleUrls: ['./terrain-list.component.scss']
})
export class TerrainListComponent implements OnInit {

  @Input() systeme !: Poste[][];

  constructor() {}

  ngOnInit(): void {
  }
}
