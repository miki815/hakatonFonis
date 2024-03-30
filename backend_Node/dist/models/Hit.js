"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Game_words_1 = __importDefault(require("./Game_words"));
const Schema = mongoose_1.default.Schema;
let Hit = new Schema({
    id: {
        type: Number
    },
    question: {
        type: Game_words_1.default
    }
});
exports.default = mongoose_1.default.model('Hit', Hit, 'hit');
