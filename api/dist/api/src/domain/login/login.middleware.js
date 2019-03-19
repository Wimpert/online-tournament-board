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
const operators_1 = require("rxjs/operators");
const user_service_1 = require("./../user/user.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let LoginMiddleware = class LoginMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    resolve(...args) {
        return (req, res, next) => {
            const credentials = req.body;
            this.userService.findOne({ username: credentials.username }).pipe(operators_1.tap((user) => {
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    if (!req.locals) {
                        req.locals = {};
                    }
                    req.locals.user = { id: user.id, email: user.email, username: user.userName };
                    next();
                }
                else {
                    res.sendStatus(common_1.HttpStatus.UNAUTHORIZED);
                }
            })).subscribe();
        };
    }
};
LoginMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LoginMiddleware);
exports.LoginMiddleware = LoginMiddleware;
//# sourceMappingURL=login.middleware.js.map