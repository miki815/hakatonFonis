"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
let id = 0;
let idDog = 0;
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (user)
                    res.json(user);
                else {
                    res.json(null);
                }
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (user)
                    res.json({ 'message': 'User with this username exists.' });
                else {
                    user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                        if (user)
                            res.json({ 'message': 'User with this email exists.' });
                        else {
                            let user = new user_1.default({
                                username: req.body.username,
                                name: req.body.name,
                                surname: req.body.surname,
                                password: req.body.password,
                                email: req.body.email,
                                telephone: req.body.telephone,
                                country: req.body.country,
                                city: req.body.city,
                                rate: 0,
                                visitedCities: [],
                                visitedCountries: [],
                                pointsQuiz: 0,
                                pointsGame: 0,
                                age: req.body.age,
                                type: req.body.type,
                                languages: req.body.languages,
                            });
                            user.save().then(() => {
                                res.status(200).json({ 'message': '0' });
                            }).catch(() => { res.status(400).json({ 'message': '-1' }); });
                        }
                    });
                }
            });
        };
    }
}
exports.UserController = UserController;
