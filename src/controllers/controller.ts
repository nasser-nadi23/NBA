import express, { Request, Response } from "express";
import { Services } from "../services/services";

const router = express.Router();
const services = new Services();

router.post("/create-team", async (req: Request, res: Response) => {
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
  const team = await services.createTeam(teamData, coachData);
  res.send(team);
});

router.post("/player-info", async (req: Request, res: Response) => {
  const player = await services.createPlayer(req.body, req.query);
  res.send(player);
});

router.get("/team-info", async (req: Request, res: Response) => {
  const teamInfo = await services.getTeamInfo(req.query.nickname as string);
  res.send(teamInfo);
});

router.get("/most-championships", async (req, res) => {
  const teamWithMostChampionships = await services.mostChampionships();
  res.send(teamWithMostChampionships);
});

router.get("/starting-lineup", async (req, res) => {
  const players = await services.startingLineup(req.query);
  res.send(players);
});

router.get("/oldest-team", async (req, res) => {
  const oldestTeam = await services.oldestTeam();
  res.send(oldestTeam);
});

export { router as Controller };
