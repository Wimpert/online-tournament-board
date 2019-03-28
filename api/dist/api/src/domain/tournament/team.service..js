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
const team_entity_1 = require("./../entities/team.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
let TeamService = class TeamService {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    save(team) {
        return rxjs_1.from(this.teamRepository.save(team));
    }
    delete(team) {
        return rxjs_1.from(this.teamRepository.delete(team));
    }
    findAllForTournamentId(tournament) {
        return rxjs_1.from(this.teamRepository.createQueryBuilder('team')
            .innerJoin('team.group', 'group')
            .innerJoin('group.league', 'league')
            .innerJoin('league.tournament', 'tournament')
            .where('tournament.id = :id', { id: tournament.id })
            .getMany());
    }
    findTeamInfo(teamId) {
        return rxjs_1.from(this.teamRepository.createQueryBuilder('team')
            .addSelect('group.name')
            .addSelect('group.id')
            .addSelect('league.id')
            .addSelect('tournament.startDateTime')
            .addSelect('homeMatch.id')
            .addSelect('outMatch.id')
            .innerJoin('team.outMatches', 'outMatch')
            .innerJoin('team.homeMatches', 'homeMatch')
            .innerJoin('team.group', 'group')
            .innerJoin('group.league', 'league')
            .innerJoin('league.tournament', 'tournament')
            .where('team.id = :id', { id: Number(teamId) })
            .getOne());
    }
};
TeamService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service..js.map