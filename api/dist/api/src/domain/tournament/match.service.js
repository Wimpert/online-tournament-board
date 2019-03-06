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
const tournament_service_1 = require("./tournament.service");
const match_entity_1 = require("domain/entities/match.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
let MatchService = class MatchService {
    constructor(matchRepository, tournamentService) {
        this.matchRepository = matchRepository;
        this.tournamentService = tournamentService;
    }
    update(match) {
        return rxjs_1.from(this.matchRepository.update({ id: match.id }, match));
    }
    save(match) {
        return rxjs_1.from(this.matchRepository.save(match));
    }
    delete(match) {
        return rxjs_1.from(this.matchRepository.delete(match));
    }
    findTournamentByMatch(match) {
        return this.tournamentService.findByMatch({ id: match.id });
    }
};
MatchService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tournament_service_1.TournamentService])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map