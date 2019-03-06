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
const constants_1 = require("./../../constants");
const auth_service_1 = require("./../../auth/auth.service");
const common_1 = require("@nestjs/common");
let LoginController = class LoginController {
    constructor(authService) {
        this.authService = authService;
    }
    login(request, response) {
        const token = this.authService.createToken({ user: request.locals.user, id: request.locals.user.id });
        response.cookie(constants_1.JWT_TOKEN_NAME, token.accessToken, { maxAge: constants_1.JWT_EXPERATION_TIME, httpOnly: true });
        response.status(common_1.HttpStatus.OK);
        response.send();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    common_1.Controller('login'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map