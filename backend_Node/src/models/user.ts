import mongoose from "mongoose";

const Schema= mongoose.Schema;
let User= new Schema({
    username:{
        type: String
    },
    name:{
        type: String
    },surname:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    telephone:{
        type: String
    },country:{
        type: String
    },
    city:{
        type: Array
    },
    rate: {
        type: String
    },
    visitedCities: {
        type: String
    },
    visitedCountries: {
        type: String
    },
    pointsQuiz:{
        type: Number
    },
    pointsGame:{
        type: Number
    },
    age:{
        type: Number
    },
    type:{
        type: String
    },
    languages:{
        type: Array
    }
    
})
export default mongoose.model('User', User, 'users')