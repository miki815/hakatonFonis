import mongoose from "mongoose";
import Game_words
 from "./Game_words";
const Schema = mongoose.Schema;

let Hit = new Schema({
    id: {
        type: Number
    },
    question:{
        type: Game_words
    }
    
})

export default mongoose.model('Hit', Hit, 'hit');