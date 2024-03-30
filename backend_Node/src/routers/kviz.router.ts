import express from 'express';
import { KvizController } from '../controllers/kviz.controller';

const gameRouter = express.Router();

gameRouter.route('/getQuestion').get(
    (req, res)=>new KvizController().getQuestion(req, res)
)

gameRouter.route('/getQuestionById').post(
    (req, res)=>new KvizController().getQuestionById(req, res)
)

export default gameRouter;