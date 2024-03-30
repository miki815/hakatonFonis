import * as express from 'express';
import Question from '../models/Question';


export class KvizController {
    getQuestion = (req: express.Request, res: express.Response) => {
        let id = Math.floor(Math.random() * 4) + 1;
        Question.findOne({ 'id': id }, (err, question) => {
            if (err) console.log(err);
            else res.json(question);
        })
    }

    getQuestionById = (req: express.Request, res: express.Response) => {
        console.log("ID quest")
        let id = req.body.id;
        Question.findOne({ 'id': id }, (err, question) => {
            if (err) console.log(err);
            else res.json(question);
        })
    }


}