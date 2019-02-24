import { HOME_TEAM_WINS, OUT_TEAM_WINS } from './../../constants';
import { Tournament } from './../entities/tournament.entity';
import { GroupMatch, RoundMatch } from './../entities/match.entity';
import { Team } from './../entities/team.entity';
import { Group } from './../entities/group.entity';
import { League } from './../entities/league.entity';

import { AuthService } from 'auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'domain/entities/user.entity';
import { switchMap, map, tap } from 'rxjs/operators';
import { Match } from 'domain/entities/match.entity';

import {setHours, setMinutes, addMinutes, getHours, getMinutes, addHours} from 'date-fns';
import { Round } from 'domain/entities/round.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private authService: AuthService,
  ) {}

  findOne(tournament: any): Observable<Tournament> {
    console.time('find');
    return from(this.tournamentRepository.findOne(tournament)).pipe(
      tap(_ => {
        console.log(_);
        console.timeEnd('find');
      }),
      map((tournament: Tournament) => this.processMatches(tournament)),
      map((tournament: Tournament) => {
        // tournament.leagues.teams.sort((teamA, teamB) => this.compareTeams(teamA, teamB));
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

  createNew(userId: number): Tournament {

    const allTeams =  [
          ['JH \'t Arsenaal', 'Mavito bvba', 'PTC De Vlasschaard', 'MVC Omniflor'],
          ['Hombres Calientes', 'De Carlsbergskes', 'Par Hazard', 'Stasebeke'],
          ['Dakwerken Dimi', 'DRST Eclips', 'Hoste-Concept', 'MVC The Comix'],
          ['Whoepi-Zwevegem', 'Hundes Intertapis', 'MVC Café De Gouden Aap', '1255 Snooker Pocket'],
          ['Spectrum', 'Re-United', 'Samba', 'MVC Vermeren'],
          ['FC Dutoit', 'Decorte zotten', 'Den befkeuning & Co', 'Los Borrachos'],
          ['sv Ziggy', 'BP De Vlasbloem', 'FC Kruisband', 'Whoepi-Boys'],
          ['Dynamo Molhoek', 'MVC Foliefotografie', 'De Seizoeners', 'DRST Eclips Zuipteam'],
    ];

    const groupLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const tour = new Tournament();

    tour.name =  new Date().toString();

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

    const rounds = ['Round of 16', 'Quarter Final', 'Semi Final', 'Final'];

    rounds.forEach((roundName) => {
        if (!tour.leagues[0].rounds){
          tour.leagues[0].rounds = [];
        }
        tour.leagues[0].rounds.push(new Round(roundName));
        tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches = [];

        let i = 0;
        while (i < 16){
          tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches.push(new RoundMatch(undefined, undefined, matchNR++, 3, 10, 20));
          i++;
        }

    });

    return tour;

  }

  processMatches(tournament: Tournament): Tournament {
    const returnVal = {... tournament} as Tournament;

    returnVal.leagues.forEach((league: League) => {
      league.groups.forEach((group: Group) => {
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
        });
    });
    return returnVal;

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
        return teamb.goalsConcieved - teama.goalsConcieved;
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
