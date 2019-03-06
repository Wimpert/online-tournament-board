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
Object.defineProperty(exports, "__esModule", { value: true });
const match_entity_1 = require("./match.entity");
const league_entity_1 = require("./league.entity");
const typeorm_1 = require("typeorm");
let Round = class Round {
    constructor(name) {
        this.name = name;
    }
    getMaxMatchNumber() {
        return this.matches.reduce((acc, match) => {
            return Math.max(match.matchNr, acc);
        }, 0);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Round.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Round.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => league_entity_1.League, league => league.groups),
    __metadata("design:type", league_entity_1.League)
], Round.prototype, "league", void 0);
__decorate([
    typeorm_1.OneToMany(type => match_entity_1.RoundMatch, match => match.round, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Round.prototype, "matches", void 0);
Round = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String])
], Round);
exports.Round = Round;
//# sourceMappingURL=round.entity.js.map