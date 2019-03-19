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
const team_service_1 = require("./team.service.");
const group_service_1 = require("./group.service");
const match_service_1 = require("./match.service");
const league_service_1 = require("./league.service");
const jwt_1 = require("@nestjs/jwt");
const tournament_service_1 = require("./tournament.service");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const referee_service_1 = require("./referee.service");
let PublicTournamentController = class PublicTournamentController {
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
        return this.tournamentService.findIdOfFirstactive().pipe(operators_1.switchMap(tournamentId => this.teamService.findAllForTournamentId(tournamentId)));
    }
};
__decorate([
    common_1.Get('/all/teams'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "findByUser", null);
PublicTournamentController = __decorate([
    common_1.Controller('public-tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService, jwt_1.JwtService,
        league_service_1.LeagueService,
        match_service_1.MatchService,
        group_service_1.GroupService,
        team_service_1.TeamService, referee_service_1.RefereeService])
], PublicTournamentController);
exports.PublicTournamentController = PublicTournamentController;
//# sourceMappingURL=public-tournament.controller.js.map