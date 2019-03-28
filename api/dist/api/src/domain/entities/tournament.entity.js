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
var Tournament_1;
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("./abstract.entity");
const league_entity_1 = require("./league.entity");
let Tournament = Tournament_1 = class Tournament extends abstract_entity_1.AbstractEntity {
    getNextMatchNumber() {
        return this.leagues.reduce((acc, league) => {
            return Math.max(acc, league.getMaxMatchNumber());
        }, 0) + 1;
    }
    static deserialize(input) {
        const tournament = new Tournament_1();
        Object.assign(tournament, input);
        return tournament;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Tournament.prototype, "startDateTime", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.tournaments),
    __metadata("design:type", user_entity_1.User)
], Tournament.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => league_entity_1.League, league => league.tournament, { cascade: true, eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Tournament.prototype, "leagues", void 0);
Tournament = Tournament_1 = __decorate([
    typeorm_1.Entity()
], Tournament);
exports.Tournament = Tournament;
//# sourceMappingURL=tournament.entity.js.map