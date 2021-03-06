import { AuthService } from './../../auth/auth.service';
import { HOME_TEAM_WINS, OUT_TEAM_WINS } from './../../constants';
import { Tournament } from './../entities/tournament.entity';
import { GroupMatch, RoundMatch } from './../entities/match.entity';
import { Team } from './../entities/team.entity';
import { Group } from './../entities/group.entity';
import { League } from './../entities/league.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { switchMap, map, tap } from 'rxjs/operators';
import { Match } from '../entities/match.entity';

import {setHours, setMinutes, addMinutes, getHours, getMinutes, addHours} from 'date-fns';
import { Round } from '../entities/round.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private authService: AuthService,
  ) {}

  findOne(tournament: any): Observable<Tournament> {
    return from(this.tournamentRepository.findOne(tournament)).pipe(
      map((tournament: Tournament) => this.processMatches(tournament)),
      map((tournament: Tournament) => {
        tournament.leagues.forEach((league: League) => {
          league.groups.forEach((group: Group) => {
            group.teams.sort((teamA, teamB) => this.compareTeams(teamA, teamB));
          });
        });
        return tournament;
      }),
    );
  }

  find(tournament: any): Observable<Tournament[]> {
    return from(this.tournamentRepository.find(tournament));
  }

  save(tournament: any): Observable<Tournament> {
    return from(this.tournamentRepository.save(tournament));
  }

  update(tournament: any): Observable<Tournament> {
    return from(this.tournamentRepository.update({id: tournament.id}, tournament)).pipe(
      switchMap( _ => this.findOne({id: tournament.id})),
    );
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.tournamentRepository.delete(id));
  }

  findByMatch(match: Match): Observable<Tournament> {
    return from(this.tournamentRepository.findOne({leagues: [{ groups: [ {matches : [match]}]}]})).pipe(
      map((tournament: Tournament) => this.processMatches(tournament)),
    );
  }

  findByGroup(group: Group): Observable<Tournament> {
    return from(this.tournamentRepository.findOne({leagues: [{ groups: [ group]}]})).pipe(
      map((tournament: Tournament) => this.processMatches(tournament)),
    );
  }

  findByTeam(team: Team): Observable<Tournament> {
    return from(this.tournamentRepository.findOne({leagues: [{ groups: [ {teams : [team]}]}]})).pipe(
      map((tournament: Tournament) => this.processMatches(tournament)),
    );
  }

  findIdOfFirstactive(): Observable<any>{
    return from(this.tournamentRepository.findOne({}, {select: ['id']}));
  }

  createNew(userId: number): Tournament {

    const allTeams =  [
          ['Par Hazard', 'De Gouden Aap', 'Het lag aan de bal', 'FC Baco Sport'],
          ['Whoepi-Boys', 'Abicon', 'Plakwerken Muylle', 'Mvc Moeder Harelbeekse'],
          ['Samba', 'La Galaxie', 'Jazzy', 'Mavito'],
          ['Hundes Intertapis', 'Decorte Zotten', 'Hombres Calientes', 'FC Stadion'],
          ['Dema-Poels', 'Re-United', 'MVC Vermeeren Travel', 'El Toros Locos'],
          ['Aalbeke Sport', 'MVC Foliefotografie', 'VVEK', 'De Copains'],
          ['MVC Le Moulin', 'FC Strand Associates', 'KFC Rossem', 'Spartak Stasegem'],
          ['Frituur Whoepi', 'Los Borrachos', 'Ninety-four', 'Los Piratas'],
    ];

    const groupLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const tour = new Tournament();

    tour.startDateTime =  new Date();

    tour.name =  tour.startDateTime.toString();

    tour.user = {id: userId} as User;

    tour.leagues = [
      {name: 'Mannen', groups : []} as League,
      {name: 'Vrouwen', groups : []} as League,
    ];

    let matchNR: number;

    allTeams.forEach((teamNames, groupIndex) => {
       const group = new Group();
       group.name = groupLetter[groupIndex];
       teamNames.forEach(teamName => {
        const team = new Team();
        team.name = teamName;
        if (!group.teams){
          group.teams = [];
        }
        group.teams.push(team);
      });

       matchNR = (groupIndex * 6) + 1;

       const tourDate = new Date(2019, 5, 4);
       let startDateTime = setMinutes(setHours(tourDate, 9), 0);
       let terrain = groupIndex * 2 + 1;

       const hour = 9;
       const minutes = 0;
       if (groupIndex > 3){
         // secondHalf half:
        startDateTime = addMinutes(startDateTime , 30);
        terrain = (groupIndex - 4) * 2 + 1;
       }

       group.matches = [];
       group.matches.push(new GroupMatch(group.teams[0], group.teams[1],
        matchNR++, terrain, getHours(startDateTime), getMinutes(startDateTime)));
       group.matches.push(new GroupMatch(group.teams[2], group.teams[3],
        matchNR++, terrain + 1 , getHours(startDateTime), getMinutes(startDateTime)));
       startDateTime = addHours(startDateTime, 1);

       group.matches.push(new GroupMatch(group.teams[0], group.teams[2],
        matchNR++, terrain, getHours(startDateTime), getMinutes(startDateTime)));
       group.matches.push(new GroupMatch(group.teams[3], group.teams[1],
        matchNR++, terrain + 1 , getHours(startDateTime), getMinutes(startDateTime)));
       startDateTime = addHours(startDateTime, 1);

       group.matches.push(new GroupMatch(group.teams[3], group.teams[0],
        matchNR++, terrain, getHours(startDateTime), getMinutes(startDateTime)));
       group.matches.push(new GroupMatch(group.teams[1], group.teams[2],
        matchNR++, terrain + 1 , getHours(startDateTime), getMinutes(startDateTime)));
       startDateTime = addHours(startDateTime, 1);

       if (!tour.leagues[0].groups){
        tour.leagues[0].groups = [];
      }
       tour.leagues[0].groups.push(group);
    });

    const rounds = ['8ste Finale', 'Kwart finale', 'Halve Final', 'Finale'];

    rounds.forEach((roundName, roundIndex) => {
        if (!tour.leagues[0].rounds){
          tour.leagues[0].rounds = [];
        }
        tour.leagues[0].rounds.push(new Round(roundName));
        tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches = [];

        let i = 0;
        let j = 2;

        while (i < 16){
          if (j > 9){
            j = 2;
          }
          tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches.push(new RoundMatch(undefined, undefined, matchNR++, j, 10, 20));
          i++;
          j++;
        }

    });

    return tour;

  }

  processMatches(tournament: Tournament): Tournament {
    const returnVal = {... tournament} as Tournament;

    returnVal.leagues.forEach((league: League) => {
      league.groups.forEach((group: Group) => {
          this.processMatchesOfGroup(group);
        });
    });
    return returnVal;

  }

  processMatchesOfGroup(group: Group){

    group.teams.forEach((team: Team) => team.reset());
    group.allMatchesPlayed = true;
    group.matches.forEach((match: Match) => {
      if (match.homeTeamScore !== undefined && match.homeTeamScore !== null && match.outTeamScore !== undefined && match.outTeamScore !== null){
        const homeTeam = group.getTeamById(match.homeTeam.id);
        const outTeam = group.getTeamById(match.outTeam.id);
        homeTeam.matchesPlayed++;
        outTeam.matchesPlayed++;

        if (match.getOutCome() === HOME_TEAM_WINS){
          homeTeam.matchesWon++;
          outTeam.matchesLost++;
        } else if (match.getOutCome() === OUT_TEAM_WINS){
          homeTeam.matchesLost++;
          outTeam.matchesWon++;
        } else {
          homeTeam.matchesDrawed++;
          outTeam.matchesDrawed++;
        }
        outTeam.goalsScored += match.outTeamScore;
        outTeam.goalsConcieved += match.homeTeamScore;
        homeTeam.goalsScored += match.homeTeamScore;
        homeTeam.goalsConcieved += match.outTeamScore;
      } else {
        group.allMatchesPlayed = false;
      }
    });
    group.teams.forEach((team: Team) => {team.points = 3 * team.matchesWon + team.matchesDrawed; });
  }

  compareTeams(teama: Team, teamb: Team): number {

    if (teama.points !== teamb.points) {
        // compare on points:
        return teamb.points - teama.points;
    } else if (teama.matchesWon !== teamb.matchesWon) {
        // on matchesWon :
        return teamb.matchesWon - teama.matchesWon;
    } else if (teama.goalsScored !== teamb.goalsScored) {
        // on goals scored:
        return teamb.goalsScored - teama.goalsScored;
    } else if (teama.goalsConcieved !== teamb.goalsConcieved) {
        // compare on goal diff:
        return teama.goalsConcieved - teamb.goalsConcieved;
    }
    //  else if (teama.internalIndex !== teamb.internalIndex) {
    //     // compare on goal diff:
    //     return teamb.internalIndex - teama.internalIndex;
    // }
    return 0;
}

  addToNextRound(league: League) {

    const achsteFinales =  league.rounds[0];

    league.groups.forEach((group: Group, groupIndex) => {

      if (group.allMatchesPlayed) {

        const startIndex = this.getMatchIndexForNextRound(groupIndex);

        if (groupIndex % 2 === 0) {
          achsteFinales.matches[startIndex].homeTeam = league.groups[groupIndex].teams[0];
          achsteFinales.matches[startIndex + 4].outTeam = league.groups[groupIndex].teams[1];
          achsteFinales.matches[startIndex + 8].homeTeam = league.groups[groupIndex].teams[2];
          achsteFinales.matches[startIndex + 12].outTeam = league.groups[groupIndex].teams[3];
        } else {
          achsteFinales.matches[startIndex + 4].homeTeam = league.groups[groupIndex].teams[0];
          achsteFinales.matches[startIndex].outTeam = league.groups[groupIndex].teams[1];
          achsteFinales.matches[startIndex + 12].homeTeam = league.groups[groupIndex].teams[2];
          achsteFinales.matches[startIndex + 8].outTeam = league.groups[groupIndex].teams[3];
        }
      }
    });
  }

  private getMatchIndexForNextRound(groupIndex: number) {

    if (groupIndex % 2 === 0) {
        return groupIndex / 2;
    } else {
      return (groupIndex - 1) / 2;
    }

  }

}
