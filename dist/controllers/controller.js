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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../services/services");
const router = express_1.default.Router();
exports.Controller = router;
const services = new services_1.Services();
router.post("/create-team", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamData = {
        name: req.body.name,
        city: req.body.city,
        founded: req.body.founded,
        nickname: req.body.nickname,
        championships: req.body.championships,
    };
    const coachData = {
        coach_name: req.body.coach_name,
    };
    const team = yield services.createTeam(teamData, coachData);
    res.send(team);
}));
router.post("/player-info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield services.createPlayer(req.body, req.query);
    res.send(player);
}));
router.get("/team-info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamInfo = yield services.getTeamInfo(req.query.nickname);
    res.send(teamInfo);
}));
router.get("/most-championships", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamWithMostChampionships = yield services.mostChampionships();
    res.send(teamWithMostChampionships);
}));
router.get("/starting-lineup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield services.startingLineup(req.query);
    res.send(players);
}));
router.get("/oldest-team", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldestTeam = yield services.oldestTeam();
    res.send(oldestTeam);
}));
