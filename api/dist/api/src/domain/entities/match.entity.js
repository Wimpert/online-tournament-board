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
const constants_1 = require("./../../constants");
const group_entity_1 = require("./group.entity");
const round_entity_1 = require("./round.entity");
const team_entity_1 = require("./team.entity");
const typeorm_1 = require("typeorm");
const referee_entity_1 = require("./referee.entity");
let Match = class Match {
    getOutCome() {
        if (this.homeTeamScore > this.outTeamScore) {
            return constants_1.HOME_TEAM_WINS;
        }
        else if (this.outTeamScore > this.homeTeamScore) {
            return constants_1.OUT_TEAM_WINS;
        }
        return constants_1.MATCH_IS_DRAW;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Match.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => team_entity_1.Team, team => team.homeMatches, { cascade: true, eager: true, nullable: true }),
    __metadata("design:type", team_entity_1.Team)
], Match.prototype, "homeTeam", void 0);
__decorate([
    typeorm_1.ManyToOne(type => team_entity_1.Team, team => team.outMatches, { cascade: true, eager: true, nullable: true }),
    __metadata("design:type", team_entity_1.Team)
], Match.prototype, "outTeam", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "homeTeamScore", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "outTeamScore", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Match.prototype, "matchNr", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "hour", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "minutes", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "terrain", void 0);
__decorate([
    typeorm_1.ManyToOne(type => referee_entity_1.Referee, referee => referee.matches, { cascade: false, eager: true, nullable: true }),
    __metadata("design:type", referee_entity_1.Referee)
], Match.prototype, "referee", void 0);
Match = __decorate([
    typeorm_1.Entity(),
    typeorm_1.TableInheritance({ column: { type: 'varchar', name: 'type' } })
], Match);
exports.Match = Match;
let GroupMatch = class GroupMatch extends Match {
    constructor(homeTeam, outTeam, matchNr, terrain, hour, minutes) {
        super();
        this.homeTeam = homeTeam;
        this.outTeam = outTeam;
        this.matchNr = matchNr;
        this.terrain = terrain;
        this.hour = hour;
        this.minutes = minutes;
    }
};
__decorate([
    typeorm_1.ManyToOne(type => group_entity_1.Group, group => group.matches),
    __metadata("design:type", group_entity_1.Group)
], GroupMatch.prototype, "group", void 0);
GroupMatch = __decorate([
    typeorm_1.ChildEntity(),
    __metadata("design:paramtypes", [team_entity_1.Team, team_entity_1.Team, Number, Number, Number, Number])
], GroupMatch);
exports.GroupMatch = GroupMatch;
let RoundMatch = class RoundMatch extends Match {
    constructor(homeTeam, outTeam, matchNr, terrain, hour, minutes) {
        super();
        this.homeTeam = homeTeam;
        this.outTeam = outTeam;
        this.matchNr = matchNr;
        this.terrain = terrain;
        this.hour = hour;
        this.minutes = minutes;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], RoundMatch.prototype, "homeTeamPenaltyScore", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], RoundMatch.prototype, "outTeamPenaltyScore", void 0);
__decorate([
    typeorm_1.ManyToOne(type => round_entity_1.Round, round => round.matches),
    __metadata("design:type", round_entity_1.Round)
], RoundMatch.prototype, "round", void 0);
RoundMatch = __decorate([
    typeorm_1.ChildEntity(),
    __metadata("design:paramtypes", [team_entity_1.Team, team_entity_1.Team, Number, Number, Number, Number])
], RoundMatch);
exports.RoundMatch = RoundMatch;
//# sourceMappingURL=match.entity.js.map