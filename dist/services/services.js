"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const coach_entity_1 = require("../entities/coach.entity");
const player_entity_1 = require("../entities/player.entity");
const team_entity_1 = require("../entities/team.entity");
class Services {
    // Create a team
    createTeam(teamData, coachData) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_entity_1.Team.create(teamData);
            const coach = yield this.coach(coachData);
            // @ts-ignore
            team.coachId = coach.id;
            yield team_entity_1.Team.save(team);
            return team;
        });
    }
    // stuff about coach
    coach(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const coach = yield coach_entity_1.Coach.create({
                coach_name: data.coach_name,
            });
            yield coach_entity_1.Coach.save(coach);
            return coach;
        });
    }
    // Get all info about a team
    getTeamInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamInfo = yield team_entity_1.Team.createQueryBuilder("team")
                .andWhere("nickname=:name", { name })
                .leftJoinAndSelect("team.coach", "coach")
                .getRawOne();
            return teamInfo;
        });
    }
    // Team with most championships
    mostChampionships() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamWithMostChampionships = yield team_entity_1.Team.createQueryBuilder("team")
                .select("MAX(team.championships)")
                .getRawOne();
            const teamName = yield team_entity_1.Team.find({
                where: { championships: teamWithMostChampionships.max },
            });
            const result = {
                team: teamName[0].name,
                championships: teamWithMostChampionships.max,
            };
            return result;
        });
    }
    // create player info
    createPlayer(playerInfo, query) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const currentTeam = query.currentteam;
            const player = yield player_entity_1.Player.create(playerInfo);
            const teamInfo = yield team_entity_1.Team.createQueryBuilder("team")
                .andWhere("team.nickname=:currentTeam", { currentTeam })
                .getRawOne();
            console.log(teamInfo);
            // @ts-ignore
            player.team = teamInfo.team_id;
            yield player_entity_1.Player.save(player);
            return player;
        });
    }
    // Get starting lineup for a given team (nickname)
    startingLineup(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamName = query.teamname;
            // const =await Team.find({ where: {nickname:teamName} });
            const teamInfo = yield team_entity_1.Team.createQueryBuilder("team")
                .andWhere("team.nickname=:teamName", { teamName })
                .getRawOne();
            if (!teamInfo) {
                return "Starting lineup for this team is not found!";
            }
            const teamId = teamInfo.team_id;
            const players = yield player_entity_1.Player.find({ where: { team: teamId } });
            const playerNames = players.map((player) => {
                return player.player_name;
            });
            return playerNames;
        });
    }
    // The oldest team in the league
    oldestTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const oldestTeamYear = yield team_entity_1.Team.createQueryBuilder("team")
                .select("MIN(team.founded)")
                .getRawOne();
            const oldestTeamName = yield team_entity_1.Team.find({
                where: {
                    founded: oldestTeamYear.min,
                },
            });
            const oldestTeam = {
                name: oldestTeamName[0].name,
                founded: oldestTeamYear.min,
            };
            return oldestTeam;
        });
    }
}
exports.Services = Services;
