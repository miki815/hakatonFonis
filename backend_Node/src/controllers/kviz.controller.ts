import * as express from 'express';
import Question from '../models/Question';


export class KvizController {
    getQuestion = (req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let qtype = req.body.qtype;
        console.log(city);
        // let id = Math.floor(Math.random() * 4) + 1;
        Question.find({ 'city': city, 'type': qtype }).then((questions) => {
            console.log(questions);
            res.json(questions);
        }).catch((err) => {
            console.log(err);
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