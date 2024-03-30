"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const Game_words_1 = __importDefault(require("../models/Game_words"));
class GameController {
    constructor() {
        this.getWord = (req, res) => {
            let id = Math.floor(Math.random() * 20) + 1;
            Game_words_1.default.findOne({ 'id': id }).then((word) => {
                res.json(word);
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.GameController = GameController;
