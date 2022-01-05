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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const team_entity_1 = require("./entities/team.entity");
const coach_entity_1 = require("./entities/coach.entity");
const controller_1 = require("./controllers/controller");
const player_entity_1 = require("./entities/player.entity");
const app = (0, express_1.default)();
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, typeorm_1.createConnection)({
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
                entities: [team_entity_1.Team, coach_entity_1.Coach, player_entity_1.Player],
            });
            console.log(`Database connected...`);
            app.use(express_1.default.json());
            app.use(controller_1.Controller);
            app.listen(3000, () => console.log("The server is running on port 3000..."));
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
