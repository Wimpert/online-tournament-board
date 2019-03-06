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
const group_entity_1 = require("./group.entity");
const typeorm_1 = require("typeorm");
const tournament_entity_1 = require("./tournament.entity");
const round_entity_1 = require("./round.entity");
let League = class League {
    getMaxMatchNumber() {
        return Math.max(this.groups.reduce((acc, group) => {
            return Math.max(acc, group.getMaxMatchNumber());
        }, 0), this.rounds.reduce((acc, round) => {
            return Math.max(acc, round.getMaxMatchNumber());
        }, 0));
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], League.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], League.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => tournament_entity_1.Tournament, tournament => tournament.leagues),
    __metadata("design:type", tournament_entity_1.Tournament)
], League.prototype, "tournament", void 0);
__decorate([
    typeorm_1.OneToMany(type => group_entity_1.Group, group => group.league, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], League.prototype, "groups", void 0);
__decorate([
    typeorm_1.OneToMany(type => round_entity_1.Round, round => round.league, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], League.prototype, "rounds", void 0);
League = __decorate([
    typeorm_1.Entity()
], League);
exports.League = League;
//# sourceMappingURL=league.entity.js.map