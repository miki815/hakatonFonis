"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kviz_controller_1 = require("../controllers/kviz.controller");
const gameRouter = express_1.default.Router();
gameRouter.route('/getQuestion').get((req, res) => new kviz_controller_1.KvizController().getQuestion(req, res));
gameRouter.route('/getQuestionById').post((req, res) => new kviz_controller_1.KvizController().getQuestionById(req, res));
exports.default = gameRouter;
