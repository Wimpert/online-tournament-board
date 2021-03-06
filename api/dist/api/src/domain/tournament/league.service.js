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
const league_entity_1 = require("./../entities/league.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let LeagueService = class LeagueService {
    constructor(leagueRepository) {
        this.leagueRepository = leagueRepository;
    }
    update(league) {
        return rxjs_1.from(this.leagueRepository.update({ id: league.id }, league)).pipe(operators_1.switchMap(_ => this.findOne({ id: league.id })));
    }
    findOne(league) {
        return rxjs_1.from(this.leagueRepository.findOne(league, { relations: ['tournament'] }));
    }
    findAllLeagues(tournament) {
        return rxjs_1.from(this.leagueRepository.createQueryBuilder('league')
            .leftJoinAndSelect('league.groups', 'group')
            .leftJoinAndSelect('league.rounds', 'round')
            .leftJoin('league.tournament', 'tournament')
            .where('tournament.id = :id', { id: tournament.id })
            .getMany());
    }
};
LeagueService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(league_entity_1.League)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeagueService);
exports.LeagueService = LeagueService;
//# sourceMappingURL=league.service.js.map