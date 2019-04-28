"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./auth/auth.middleware");
const domain_module_1 = require("./domain/domain.module");
const auth_module_1 = require("./auth/auth.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cookie_parser_1 = require("@nest-middlewares/cookie-parser");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cookie_parser_1.CookieParserMiddleware).forRoutes({ path: '*', method: common_1.RequestMethod.ALL }).apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'public-tournament', method: common_1.RequestMethod.GET })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWD,
                database: process.env.DB_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                dropSchema: false,
                logging: false,
            }),
            domain_module_1.DomainModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map