import { Team } from './team.model';
export class Match {

  id: number;
  homeTeam: Team;
  outTeam: Team;
  homeTeamScore: number | string;
  outTeamScore: number | string;
  matchNr: number;
  terrain: string;
  minutes: number;
  hour: number;
  referee: {id: number, name: string};

}
