import { Coach } from "../entities/coach.entity";
import { Player } from "../entities/player.entity";
import { Team } from "../entities/team.entity";

export class Services {
  // Create a team
  async createTeam(teamData: any, coachData: any) {
    const team = await Team.create(teamData);
    const coach = await this.coach(coachData);
    // @ts-ignore
    team.coachId = coach.id;
    await Team.save(team);
    return team;
  }

  // stuff about coach
  async coach(data: any) {
    const coach = await Coach.create({
      coach_name: data.coach_name,
    });
    await Coach.save(coach);
    return coach;
  }

  // Get all info about a team
  async getTeamInfo(name: string) {
    const teamInfo = await Team.createQueryBuilder("team")
      .andWhere("nickname=:name", { name })
      .leftJoinAndSelect("team.coach", "coach")
      .getRawOne();
    return teamInfo;
  }

  // Team with most championships
  async mostChampionships() {
    const teamWithMostChampionships = await Team.createQueryBuilder("team")
      .select("MAX(team.championships)")
      .getRawOne();
    const teamName = await Team.find({
      where: { championships: teamWithMostChampionships.max },
    });

    const result = {
      team: teamName[0].name,
      championships: teamWithMostChampionships.max,
    };

    return result;
  }

  // create player info
  async createPlayer(playerInfo: any, query: any) {
    // @ts-ignore
    const currentTeam = query.currentteam;

    const player = await Player.create(playerInfo);
    const teamInfo = await Team.createQueryBuilder("team")
      .andWhere("team.nickname=:currentTeam", { currentTeam })
      .getRawOne();
    console.log(teamInfo);

    // @ts-ignore
    player.team = teamInfo.team_id;
    await Player.save(player);
    return player;
  }

  // Get starting lineup for a given team (nickname)
  async startingLineup(query: any) {
    const teamName = query.teamname;
    // const =await Team.find({ where: {nickname:teamName} });
    const teamInfo = await Team.createQueryBuilder("team")
      .andWhere("team.nickname=:teamName", { teamName })
      .getRawOne();
    if (!teamInfo) {
      return "Starting lineup for this team is not found!";
    }
    const teamId = teamInfo.team_id;
    const players = await Player.find({ where: { team: teamId } });

    const playerNames = players.map((player) => {
      return player.player_name;
    });

    return playerNames;
  }

  // The oldest team in the league
  async oldestTeam() {
    const oldestTeamYear = await Team.createQueryBuilder("team")
      .select("MIN(team.founded)")
      .getRawOne();
    const oldestTeamName = await Team.find({
      where: {
        founded: oldestTeamYear.min,
      },
    });
    const oldestTeam = {
      name: oldestTeamName[0].name,
      founded: oldestTeamYear.min,
    };
    return oldestTeam;
  }
}
