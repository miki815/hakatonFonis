import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Message = new Schema({
    date: {
        type: Date
    },
    message: {
        type: String
    },
    from: {
        type: String
    },
})

export default mongoose.model('Message', Message, 'message');