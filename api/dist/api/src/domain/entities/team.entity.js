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
const match_entity_1 = require("./match.entity");
let Team = class Team {
    constructor() {
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.matchesDrawed = 0;
        this.points = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
    }
    reset() {
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.matchesDrawed = 0;
        this.points = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => group_entity_1.Group, group => group.teams),
    __metadata("design:type", group_entity_1.Group)
], Team.prototype, "group", void 0);
__decorate([
    typeorm_1.OneToMany(type => match_entity_1.Match, match => match.homeTeam),
    __metadata("design:type", Array)
], Team.prototype, "homeMatches", void 0);
__decorate([
    typeorm_1.OneToMany(type => match_entity_1.Match, match => match.outTeam),
    __metadata("design:type", Array)
], Team.prototype, "outMatches", void 0);
Team = __decorate([
    typeorm_1.Entity()
], Team);
exports.Team = Team;
//# sourceMappingURL=team.entity.js.map