"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Question = new Schema({
    id: {
        type: Number
    },
    text: {
        type: String
    },
    answer1: {
        type: String
    },
    answer2: {
        type: String
    },
    answer3: {
        type: String
    },
    answer4: {
        type: String
    },
    correctAnswer: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Question', Question, 'questions');