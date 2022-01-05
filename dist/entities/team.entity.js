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
exports.Team = void 0;
const typeorm_1 = require("typeorm");
const coach_entity_1 = require("./coach.entity");
const player_entity_1 = require("./player.entity");
let Team = class Team extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "founded", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "championships", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "coachId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => coach_entity_1.Coach, (coach) => coach.team),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", coach_entity_1.Coach)
], Team.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => player_entity_1.Player, (player) => player.team),
    __metadata("design:type", Array)
], Team.prototype, "players", void 0);
Team = __decorate([
    (0, typeorm_1.Entity)()
], Team);
exports.Team = Team;
