import * as express from 'express';
import Game_words from '../models/Game_words';


export class GameController {
    getWord = (req: express.Request, res: express.Response) => {
        let id = Math.floor(Math.random() * 20) + 1;
        Game_words.findOne({ 'id': id }).then((word) => {
            res.json(word);    
        
        }).catch((err)=>{
            console.log(err);
        })
    }
}