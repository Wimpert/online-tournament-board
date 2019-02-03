import { League } from "./league.model";

export class Tournament{

  constructor(){
    this.leagues = [
      {name: 'Mannen'},
      {name: 'Vrouwen'}
    ]
  }
  id: number;
  name:string;
  leagues: League[];
}

