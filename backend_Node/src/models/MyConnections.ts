import mongoose from "mongoose";

const Schema = mongoose.Schema;

let MyConnections = new Schema({
    users: {
        type: Array
    },
    connected: {
        type: Number
    }
})

export default mongoose.model('MyConnections', MyConnections, 'myconnections');