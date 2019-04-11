"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const round_entity_1 = require("./entities/round.entity");
const round_service_1 = require("./tournament/round.service");
const public_tournament_controller_1 = require("./tournament/public-tournament.controller");
const team_service_1 = require("./tournament/team.service.");
const team_entity_1 = require("./entities/team.entity");
const group_service_1 = require("./tournament/group.service");
const group_entity_1 = require("./entities/group.entity");
const match_service_1 = require("./tournament/match.service");
const match_entity_1 = require("./entities/match.entity");
const league_entity_1 = require("./entities/league.entity");
const league_service_1 = require("./tournament/league.service");
const login_middleware_1 = require("./login/login.middleware");
const login_controller_1 = require("./login/login.controller");
const user_service_1 = require("./user/user.service");
const user_entity_1 = require("./entities/user.entity");
const user_controller_1 = require("./user/user.controller");
const tournament_controller_1 = require("./tournament/tournament.controller");
const tournament_service_1 = require("./tournament/tournament.service");
const tournament_entity_1 = require("./entities/tournament.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const referee_service_1 = require("./tournament/referee.service");
const referee_entity_1 = require("./entities/referee.entity");
let DomainModule = class DomainModule {
    configure(consumer) {
        consumer.apply(login_middleware_1.LoginMiddleware)
            .forRoutes(login_controller_1.LoginController);
    }
};
DomainModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tournament_entity_1.Tournament, user_entity_1.User, league_entity_1.League, match_entity_1.Match, group_entity_1.Group, team_entity_1.Team, referee_entity_1.Referee, round_entity_1.Round]), auth_module_1.AuthModule],
        providers: [tournament_service_1.TournamentService, user_service_1.UserService, auth_service_1.AuthService, league_service_1.LeagueService, match_service_1.MatchService, group_service_1.GroupService, team_service_1.TeamService, referee_service_1.RefereeService, round_service_1.RoundService],
        controllers: [tournament_controller_1.TournamentController, user_controller_1.UserController, login_controller_1.LoginController, public_tournament_controller_1.PublicTournamentController],
    })
], DomainModule);
exports.DomainModule = DomainModule;
//# sourceMappingURL=domain.module.js.map