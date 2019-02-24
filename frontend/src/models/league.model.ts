import { Group } from './group.model';
import { Round } from './round.model';
export class League {

  id: number;
  name: string;
  groups: Group[];
  rounds: Round[];

}
