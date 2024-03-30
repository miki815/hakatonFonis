import express from 'express';
import { KvizController } from '../controllers/kviz.controller';

const kvizRouter = express.Router();

kvizRouter.route('/getQuestion').get(
    (req, res)=>new KvizController().getQuestion(req, res)
)

kvizRouter.route('/getQuestionById').post(
    (req, res)=>new KvizController().getQuestionById(req, res)
)

export default kvizRouter;