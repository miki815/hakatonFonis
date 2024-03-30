"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KvizController = void 0;
const Question_1 = __importDefault(require("../models/Question"));
class KvizController {
    constructor() {
        this.getQuestion = (req, res) => {
            let city = req.body.city;
            let qtype = req.body.qtype;
            console.log(city);
            // let id = Math.floor(Math.random() * 4) + 1;
            Question_1.default.find({ 'city': city, 'type': qtype }).then((questions) => {
                console.log(questions);
                res.json(questions);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getQuestionById = (req, res) => {
            console.log("ID quest");
            let id = req.body.id;
            Question_1.default.findOne({ 'id': id }, (err, question) => {
                if (err)
                    console.log(err);
                else
                    res.json(question);
            });
        };
    }
}
exports.KvizController = KvizController;
