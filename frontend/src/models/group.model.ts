import { Team } from './team.model';
import { Match } from './match.model';
export class Group {

  id: number;
  name: string;
  teams: Team[];
  matches: Match[];
  allMatchesPlayed: boolean;

}
