"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./../../auth/auth.service");
const constants_1 = require("./../../constants");
const tournament_entity_1 = require("./../entities/tournament.entity");
const match_entity_1 = require("./../entities/match.entity");
const team_entity_1 = require("./../entities/team.entity");
const group_entity_1 = require("./../entities/group.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const date_fns_1 = require("date-fns");
const round_entity_1 = require("../entities/round.entity");
let TournamentService = class TournamentService {
    constructor(tournamentRepository, authService) {
        this.tournamentRepository = tournamentRepository;
        this.authService = authService;
    }
    findOne(tournament) {
        return rxjs_1.from(this.tournamentRepository.findOne(tournament)).pipe(operators_1.tap(console.log), operators_1.map((tournament) => this.processMatches(tournament)), operators_1.map((tournament) => {
            tournament.leagues.forEach((league) => {
                league.groups.forEach((group) => {
                    group.teams.sort((teamA, teamB) => this.compareTeams(teamA, teamB));
                });
            });
            return tournament;
        }));
    }
    find(tournament) {
        return rxjs_1.from(this.tournamentRepository.find(tournament));
    }
    save(tournament) {
        return rxjs_1.from(this.tournamentRepository.save(tournament));
    }
    update(tournament) {
        return rxjs_1.from(this.tournamentRepository.update({ id: tournament.id }, tournament)).pipe(operators_1.switchMap(_ => this.findOne({ id: tournament.id })));
    }
    delete(id) {
        return rxjs_1.from(this.tournamentRepository.delete(id));
    }
    findByMatch(match) {
        return rxjs_1.from(this.tournamentRepository.findOne({ leagues: [{ groups: [{ matches: [match] }] }] })).pipe(operators_1.map((tournament) => this.processMatches(tournament)));
    }
    findByGroup(group) {
        return rxjs_1.from(this.tournamentRepository.findOne({ leagues: [{ groups: [group] }] })).pipe(operators_1.map((tournament) => this.processMatches(tournament)));
    }
    findByTeam(team) {
        return rxjs_1.from(this.tournamentRepository.findOne({ leagues: [{ groups: [{ teams: [team] }] }] })).pipe(operators_1.map((tournament) => this.processMatches(tournament)));
    }
    findIdOfFirstactive() {
        return rxjs_1.from(this.tournamentRepository.findOne({}, { select: ['id'] }));
    }
    createNew(userId) {
        const allTeams = [
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
        const tour = new tournament_entity_1.Tournament();
        tour.startDateTime = new Date();
        tour.name = tour.startDateTime.toString();
        tour.user = { id: userId };
        tour.leagues = [
            { name: 'Mannen', groups: [] },
            { name: 'Vrouwen', groups: [] },
        ];
        let matchNR;
        allTeams.forEach((teamNames, groupIndex) => {
            const group = new group_entity_1.Group();
            group.name = groupLetter[groupIndex];
            teamNames.forEach(teamName => {
                const team = new team_entity_1.Team();
                team.name = teamName;
                if (!group.teams) {
                    group.teams = [];
                }
                group.teams.push(team);
            });
            matchNR = (groupIndex * 6) + 1;
            const tourDate = new Date(2019, 5, 4);
            let startDateTime = date_fns_1.setMinutes(date_fns_1.setHours(tourDate, 9), 0);
            let terrain = groupIndex * 2 + 1;
            const hour = 9;
            const minutes = 0;
            if (groupIndex > 3) {
                startDateTime = date_fns_1.addMinutes(startDateTime, 30);
                terrain = (groupIndex - 4) * 2 + 1;
            }
            group.matches = [];
            group.matches.push(new match_entity_1.GroupMatch(group.teams[0], group.teams[1], matchNR++, terrain, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            group.matches.push(new match_entity_1.GroupMatch(group.teams[2], group.teams[3], matchNR++, terrain + 1, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            startDateTime = date_fns_1.addHours(startDateTime, 1);
            group.matches.push(new match_entity_1.GroupMatch(group.teams[0], group.teams[2], matchNR++, terrain, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            group.matches.push(new match_entity_1.GroupMatch(group.teams[3], group.teams[1], matchNR++, terrain + 1, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            startDateTime = date_fns_1.addHours(startDateTime, 1);
            group.matches.push(new match_entity_1.GroupMatch(group.teams[3], group.teams[0], matchNR++, terrain, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            group.matches.push(new match_entity_1.GroupMatch(group.teams[1], group.teams[2], matchNR++, terrain + 1, date_fns_1.getHours(startDateTime), date_fns_1.getMinutes(startDateTime)));
            startDateTime = date_fns_1.addHours(startDateTime, 1);
            if (!tour.leagues[0].groups) {
                tour.leagues[0].groups = [];
            }
            tour.leagues[0].groups.push(group);
        });
        const rounds = ['8ste Finale', 'Kwart finale', 'Halve Final', 'Finale'];
        rounds.forEach((roundName, roundIndex) => {
            if (!tour.leagues[0].rounds) {
                tour.leagues[0].rounds = [];
            }
            tour.leagues[0].rounds.push(new round_entity_1.Round(roundName));
            tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches = [];
            let i = 0;
            let j = 2;
            while (i < 16) {
                if (j > 9) {
                    j = 2;
                }
                tour.leagues[0].rounds[tour.leagues[0].rounds.length - 1].matches.push(new match_entity_1.RoundMatch(undefined, undefined, matchNR++, j, 10, 20));
                i++;
                j++;
            }
        });
        return tour;
    }
    processMatches(tournament) {
        const returnVal = Object.assign({}, tournament);
        returnVal.leagues.forEach((league) => {
            league.groups.forEach((group) => {
                this.processMatchesOfGroup(group);
            });
        });
        return returnVal;
    }
    processMatchesOfGroup(group) {
        group.teams.forEach((team) => team.reset());
        group.allMatchesPlayed = true;
        group.matches.forEach((match) => {
            if (match.homeTeamScore !== undefined && match.homeTeamScore !== null && match.outTeamScore !== undefined && match.outTeamScore !== null) {
                const homeTeam = group.getTeamById(match.homeTeam.id);
                const outTeam = group.getTeamById(match.outTeam.id);
                homeTeam.matchesPlayed++;
                outTeam.matchesPlayed++;
                if (match.getOutCome() === constants_1.HOME_TEAM_WINS) {
                    homeTeam.matchesWon++;
                    outTeam.matchesLost++;
                }
                else if (match.getOutCome() === constants_1.OUT_TEAM_WINS) {
                    homeTeam.matchesLost++;
                    outTeam.matchesWon++;
                }
                else {
                    homeTeam.matchesDrawed++;
                    outTeam.matchesDrawed++;
                }
                outTeam.goalsScored += match.outTeamScore;
                outTeam.goalsConcieved += match.homeTeamScore;
                homeTeam.goalsScored += match.homeTeamScore;
                homeTeam.goalsConcieved += match.outTeamScore;
            }
            else {
                group.allMatchesPlayed = false;
            }
        });
        group.teams.forEach((team) => { team.points = 3 * team.matchesWon + team.matchesDrawed; });
    }
    compareTeams(teama, teamb) {
        if (teama.points !== teamb.points) {
            return teamb.points - teama.points;
        }
        else if (teama.matchesWon !== teamb.matchesWon) {
            return teamb.matchesWon - teama.matchesWon;
        }
        else if (teama.goalsScored !== teamb.goalsScored) {
            return teamb.goalsScored - teama.goalsScored;
        }
        else if (teama.goalsConcieved !== teamb.goalsConcieved) {
            return teamb.goalsConcieved - teama.goalsConcieved;
        }
        return 0;
    }
    addToNextRound(league) {
        const achsteFinales = league.rounds[0];
        league.groups.forEach((group, groupIndex) => {
            if (group.allMatchesPlayed) {
                const startIndex = this.getMatchIndexForNextRound(groupIndex);
                if (groupIndex % 2 === 0) {
                    achsteFinales.matches[startIndex].homeTeam = league.groups[groupIndex].teams[0];
                    achsteFinales.matches[startIndex + 4].outTeam = league.groups[groupIndex].teams[1];
                    achsteFinales.matches[startIndex + 8].homeTeam = league.groups[groupIndex].teams[2];
                    achsteFinales.matches[startIndex + 12].outTeam = league.groups[groupIndex].teams[3];
                }
                else {
                    achsteFinales.matches[startIndex + 4].homeTeam = league.groups[groupIndex].teams[0];
                    achsteFinales.matches[startIndex].outTeam = league.groups[groupIndex].teams[1];
                    achsteFinales.matches[startIndex + 12].homeTeam = league.groups[groupIndex].teams[2];
                    achsteFinales.matches[startIndex + 8].outTeam = league.groups[groupIndex].teams[3];
                }
            }
        });
    }
    getMatchIndexForNextRound(groupIndex) {
        if (groupIndex % 2 === 0) {
            return groupIndex / 2;
        }
        else {
            return (groupIndex - 1) / 2;
        }
    }
};
TournamentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tournament_entity_1.Tournament)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], TournamentService);
exports.TournamentService = TournamentService;
//# sourceMappingURL=tournament.service.js.map