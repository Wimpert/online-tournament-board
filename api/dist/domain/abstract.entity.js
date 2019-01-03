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
const typeorm_1 = require("typeorm");
class AbstractEntity {
    updateDatesForSave() {
        if (!this.createdDate) {
            this.createdDate = new Date();
        }
        this.lastUpdated = new Date();
    }
}
__decorate([
    typeorm_1.Column({ name: 'created' }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'updated' }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "lastUpdated", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbstractEntity.prototype, "updateDatesForSave", null);
exports.AbstractEntity = AbstractEntity;
//# sourceMappingURL=abstract.entity.js.map