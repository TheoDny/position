export class Poste {
  avant ?: boolean = false;
  banc ?: boolean = false;
  equipe = 1

  constructor( public x: number,
               public y: number,
               public posteName: string = ""
               ) {

    }
}
