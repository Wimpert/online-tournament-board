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
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./../constants");
const jwt_strategy_1 = require("./jwt.strategy");
const common_1 = require("@nestjs/common");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtStrategy, jwtService) {
        this.jwtStrategy = jwtStrategy;
        this.jwtService = jwtService;
    }
    resolve(...args) {
        return (req, res, next) => {
            if (req.originalUrl === '/api/user' || req.originalUrl === '/api/login') {
                next();
            }
            else if (req.cookies === undefined || req.cookies[constants_1.JWT_TOKEN_NAME] === undefined) {
                res.sendStatus(common_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                const token = req.cookies[constants_1.JWT_TOKEN_NAME];
                try {
                    if (!this.jwtService.verify(token)) {
                        res.sendStatus(common_1.HttpStatus.UNAUTHORIZED);
                    }
                }
                catch (error) {
                    res.sendStatus(common_1.HttpStatus.UNAUTHORIZED);
                }
                next();
            }
        };
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_strategy_1.JwtStrategy, jwt_1.JwtService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map