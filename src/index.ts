import express from "express";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { Team } from "./entities/team.entity";
import { Coach } from "./entities/coach.entity";
import { Controller } from "./controllers/controller";
import { Player } from "./entities/player.entity";

const app = express();
dotenv.config();

async function main() {
  try {
    await createConnection({
      type: "postgres",
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      extra: {
        trustServerCertificate: true,
      },
      synchronize: true,
      logging: true,
      entities: [Team, Coach, Player],
    });
    console.log(`Database connected...`);
    app.use(express.json());
    app.use(Controller);
    app.listen(3000, () =>
      console.log("The server is running on port 3000...")
    );
  } catch (error: any) {
    console.log(error);
  }
}

main();
