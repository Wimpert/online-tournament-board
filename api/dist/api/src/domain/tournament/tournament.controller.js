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
const tournament_entity_1 = require("../entities/tournament.entity");
const team_service_1 = require("./team.service.");
const team_entity_1 = require("./../entities/team.entity");
const group_service_1 = require("./group.service");
const group_entity_1 = require("./../entities/group.entity");
const match_entity_1 = require("../entities/match.entity");
const match_service_1 = require("./match.service");
const league_service_1 = require("./league.service");
const league_entity_1 = require("./../entities/league.entity");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./../../constants");
const tournament_service_1 = require("./tournament.service");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const referee_service_1 = require("./referee.service");
let TournamentController = class TournamentController {
    constructor(tournamentService, jwtService, leagueService, matchService, groupService, teamService, refereeService) {
        this.tournamentService = tournamentService;
        this.jwtService = jwtService;
        this.leagueService = leagueService;
        this.matchService = matchService;
        this.groupService = groupService;
        this.teamService = teamService;
        this.refereeService = refereeService;
    }
    findByUser(request) {
        const token = this.jwtService.decode(request.cookies[constants_1.JWT_TOKEN_NAME]);
        return this.tournamentService.find({ userId: token.user.id });
    }
    getAllReferees(request) {
        return this.refereeService.findAll();
    }
    getAllTeamsforTournament(leagueId) {
        return this.teamService.findAllForLeagueId(leagueId);
    }
    findById(id) {
        return this.tournamentService.findOne({ id }).pipe(operators_1.map(tournament => {
            if (tournament === undefined) {
                throw new common_2.HttpException('Tournament not found', common_2.HttpStatus.NOT_FOUND);
            }
            return tournament;
        }));
    }
    updateLeague(league) {
        return this.leagueService.update(league);
    }
    updateMatch(match) {
        if (match.minutes === '') {
            match.minutes = null;
        }
        if (match.hour === '') {
            match.hour = null;
        }
        return this.matchService.update(match).pipe(operators_1.switchMap(_ => this.tournamentService.findByMatch(match)));
    }
    updateTeam(team) {
        return this.teamService.save(team).pipe(operators_1.switchMap(_ => this.tournamentService.findByTeam(team)));
    }
    updateGroup(group) {
        return this.groupService.save(group).pipe(operators_1.switchMap(_ => this.tournamentService.findByGroup(group)));
    }
    addToKnockoutRound(leagueId) {
        return this.tournamentService.findOne({ leagues: [{ id: leagueId }] }).pipe(operators_1.map((tournament) => this.tournamentService.processMatches(tournament)), operators_1.tap((tournament) => {
            const leagueToProcess = tournament.leagues.find(league => {
                return league.id === Number(leagueId);
            });
            if (leagueToProcess) {
                this.tournamentService.addToNextRound(leagueToProcess);
            }
        }), operators_1.switchMap((tournament) => this.tournamentService.save(tournament)));
    }
    addGroupToLeague(leagueId) {
        const group = new group_entity_1.Group();
        group.league = { id: leagueId };
        group.name = new Date().toString();
        return this.groupService.save(group).pipe(operators_1.switchMap(_ => this.tournamentService.findOne({ leagues: [{ id: leagueId }] }).pipe(operators_1.map((tournament) => this.tournamentService.processMatches(tournament)))));
    }
    addTeamToGroup(groupId) {
        const team = new team_entity_1.Team();
        team.group = { id: groupId };
        team.name = new Date().toString();
        return this.teamService.save(team).pipe(operators_1.switchMap(_ => this.tournamentService.findOne({ groups: [{ id: groupId }] }).pipe(operators_1.map((tournament) => this.tournamentService.processMatches(tournament)))));
    }
    addMatchoGroup(groupId) {
        return this.tournamentService.findByGroup({ id: groupId }).pipe(operators_1.map((tournament) => {
            return tournament_entity_1.Tournament.deserialize(tournament);
        }), operators_1.map((tournament) => {
            const matchNumber = tournament.getNextMatchNumber();
            return { matchNumber, tournament };
        }), operators_1.switchMap((data) => {
            const newMatch = new match_entity_1.GroupMatch(undefined, undefined, data.matchNumber, undefined, undefined, undefined);
            newMatch.group = { id: groupId };
            return this.matchService.save(newMatch).pipe(operators_1.map(_ => {
                const group = data.tournament.leagues.map((league) => {
                    return league.groups.find((group) => group.id === Number(groupId));
                }).pop();
                if (group) {
                    if (!group.matches) {
                        group.matches = [];
                    }
                    group.matches.push(newMatch);
                }
                return data.tournament;
            }));
        }));
    }
    update(tournament) {
        return this.tournamentService.update(tournament);
    }
    create(req) {
        const tournamentToSave = this.tournamentService.createNew(Number(this.jwtService.decode(req.cookies[constants_1.JWT_TOKEN_NAME]).user.id));
        return this.tournamentService.save(tournamentToSave);
    }
    delete(id, req) {
        return this.tournamentService.findOne({ id, user: Number(this.jwtService.decode(req.cookies[constants_1.JWT_TOKEN_NAME]).user.id) }).pipe(operators_1.filter(tournament => tournament !== undefined), operators_1.switchMap(_ => this.tournamentService.delete(id)));
    }
    deleteTeam(teamId) {
        return this.teamService.delete({ id: teamId });
    }
    deleteGroup(groupId) {
        return this.groupService.delete({ id: groupId });
    }
    deleteMatch(matchId) {
        return this.matchService.delete({ id: matchId });
    }
};
__decorate([
    common_2.Get('/all'),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "findByUser", null);
__decorate([
    common_2.Get('/referee/all'),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "getAllReferees", null);
__decorate([
    common_2.Get('/team/all/:leagueId'),
    __param(0, common_2.Param('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "getAllTeamsforTournament", null);
__decorate([
    common_2.Get(':id'),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "findById", null);
__decorate([
    common_1.Put('/league'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [league_entity_1.League]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "updateLeague", null);
__decorate([
    common_1.Put('/match'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_entity_1.Match]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "updateMatch", null);
__decorate([
    common_1.Put('/team'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_entity_1.Team]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "updateTeam", null);
__decorate([
    common_1.Put('/group'),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_entity_1.Group]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "updateGroup", null);
__decorate([
    common_1.Put('/addToKnockoutRound/:id'),
    __param(0, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "addToKnockoutRound", null);
__decorate([
    common_1.Post('/addGroup/leagueId/:leagueId'),
    __param(0, common_2.Param('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addGroupToLeague", null);
__decorate([
    common_1.Post('/addTeam/groupId/:groupId'),
    __param(0, common_2.Param('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addTeamToGroup", null);
__decorate([
    common_1.Post('/addMatch/groupId/:groupId'),
    __param(0, common_2.Param('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addMatchoGroup", null);
__decorate([
    common_1.Put(),
    __param(0, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tournament_entity_1.Tournament]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "update", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_2.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "delete", null);
__decorate([
    common_1.Delete('/team/:teamId'),
    __param(0, common_2.Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "deleteTeam", null);
__decorate([
    common_1.Delete('/group/:groupId'),
    __param(0, common_2.Param('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "deleteGroup", null);
__decorate([
    common_1.Delete('/match/:matchId'),
    __param(0, common_2.Param('matchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], TournamentController.prototype, "deleteMatch", null);
TournamentController = __decorate([
    common_2.Controller('tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService, jwt_1.JwtService,
        league_service_1.LeagueService,
        match_service_1.MatchService,
        group_service_1.GroupService,
        team_service_1.TeamService, referee_service_1.RefereeService])
], TournamentController);
exports.TournamentController = TournamentController;
//# sourceMappingURL=tournament.controller.js.map