import { HOME_TEAM_WINS, OUT_TEAM_WINS } from './../../constants';
import { Tournament } from './../entities/tournament.entity';
import { GroupMatch } from './../entities/match.entity';
import { Team } from './../entities/team.entity';
import { Group } from './../entities/group.entity';
import { League } from './../entities/league.entity';

import { AuthService } from 'auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'domain/entities/user.entity';
import { switchMap, map } from 'rxjs/operators';
import { Match } from 'domain/entities/match.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private authService: AuthService
  ) {}

  findOne(tournament: any): Observable<Tournament> {
    return from(this.tournamentRepository.findOne(tournament)).pipe(
      map((tournament: Tournament) => this.processMatches(tournament))
    );
  }

  find(tournament: any): Observable<Tournament[]> {
    return from(this.tournamentRepository.find(tournament));
  }

  save(tournament: any) : Observable<Tournament> {
    return from(this.tournamentRepository.save(tournament));
  }

  update(tournament: any) : Observable<Tournament> {
    return from(this.tournamentRepository.update({id: tournament.id}, tournament)).pipe(
      switchMap( _ => this.findOne({id: tournament.id}))
    );
  }

  delete(id: number) : Observable<DeleteResult> {
    return from(this.tournamentRepository.delete(id));
  }

  findByMatch(match: Match) : Observable<Tournament> {
    return from(this.tournamentRepository.findOne({leagues: [{ groups: [ {matches : [match]}]}]})).pipe(
      map((tournament: Tournament) => this.processMatches(tournament))
    );
  }

  createNew(userId: number): Tournament {

    let allTeams =  [
          ["JH 't Arsenaal", "Mavito bvba", "PTC De Vlasschaard", "MVC Omniflor"],
          ["Hombres Calientes", "De Carlsbergskes", "Par Hazard", "Stasebeke"],
          ["Dakwerken Dimi", "DRST Eclips", "Hoste-Concept", "MVC The Comix"],
          ["Whoepi-Zwevegem", "Hundes Intertapis", "MVC Café De Gouden Aap", "1255 Snooker Pocket"],
          ["Spectrum", "Re-United", "Samba", "MVC Vermeren"],
          ["FC Dutoit", "Decorte zotten", "Den befkeuning & Co", "Los Borrachos"],
          ["sv Ziggy", "BP De Vlasbloem", "FC Kruisband", "Whoepi-Boys"],
          ["Dynamo Molhoek", "MVC Foliefotografie", "De Seizoeners", "DRST Eclips Zuipteam"],
    ];

    let groupLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const tour = new Tournament();

    tour.name =  new Date().toString();

    tour.user = {id:userId} as User;

    tour.leagues = [
      {name: 'Mannen', groups : []} as League, 
      {name: 'Vrouwen', groups : []} as League
    ];


    allTeams.forEach((teamNames,index) => {
       const group = new Group();
       group.name = groupLetter[index];
      teamNames.forEach(teamName => {
        const team = new Team();
        team.name = teamName;
        if(!group.teams){
          group.teams = [];
        }
        group.teams.push(team);
      });

      let startGroupMacthNR = (index*6)+1;

      group.matches = [];
      group.matches.push(new GroupMatch(group.teams[0], group.teams[1], startGroupMacthNR++));
      group.matches.push(new GroupMatch(group.teams[2], group.teams[3],startGroupMacthNR++));

      group.matches.push(new GroupMatch(group.teams[0], group.teams[2], startGroupMacthNR++));
      group.matches.push(new GroupMatch(group.teams[3], group.teams[1], startGroupMacthNR++));

      group.matches.push(new GroupMatch(group.teams[3], group.teams[0], startGroupMacthNR++));
      group.matches.push(new GroupMatch(group.teams[1], group.teams[2], startGroupMacthNR++));

      if(!tour.leagues[0].groups){
        tour.leagues[0].groups = [];
      }
      tour.leagues[0].groups.push(group);
    });

    return tour;

  }

  processMatches(tournament: Tournament) : Tournament {
    const returnVal = {... tournament} as Tournament;

    returnVal.leagues.forEach((league: League) => {
      league.groups.forEach((group: Group) => {
        group.matches.forEach((match: Match) => {
          if(match.homeTeamScore !== undefined && match.homeTeamScore !== null && match.outTeamScore !== undefined && match.outTeamScore !== null){
            const homeTeam = group.getTeamById(match.homeTeam.id);
            const outTeam = group.getTeamById(match.outTeam.id);
            homeTeam.matchesPlayed++;
            outTeam.matchesPlayed++;

            if(match.getOutCome() === HOME_TEAM_WINS){
              homeTeam.matchesWon++;
              outTeam.matchesLost++;
            } else if(match.getOutCome() === OUT_TEAM_WINS){
              homeTeam.matchesLost++;
              outTeam.matchesWon++;
            } else {
              homeTeam.matchesDrawed++;
              outTeam.matchesDrawed++;
            }
          }
        });
        group.teams.forEach((team:Team) => {team.points = 3*team.matchesWon + team.matchesDrawed})
        });
    });

    return returnVal;

  }

}
