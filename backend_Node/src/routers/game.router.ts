import express from 'express';
import { GameController } from '../controllers/game.controller';

const gameRouter = express.Router();

gameRouter.route('/getWord').get(
    (req, res)=>new GameController().getWord(req, res)
)

export default gameRouter;