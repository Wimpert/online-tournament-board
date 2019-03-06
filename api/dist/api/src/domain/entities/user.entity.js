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
const abstract_entity_1 = require("./abstract.entity");
const tournament_entity_1 = require("./tournament.entity");
const typeorm_1 = require("typeorm");
let User = class User extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_name' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ name: 'first_name' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_name' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.OneToMany(type => tournament_entity_1.Tournament, tournament => tournament.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "tournaments", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map