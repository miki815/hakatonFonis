"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const console_1 = require("console");
let id = 0;
let idDog = 0;
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password })
                .then(user => {
                if (user)
                    res.json(user);
                else {
                    res.json(null);
                }
            })
                .catch(err => {
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username })
                .then(user => {
                if (user)
                    res.json({ 'message': 'User with this username exists.' });
                else {
                    (0, console_1.log)("OK");
                    user_1.default.findOne({ 'email': req.body.email })
                        .then(user => {
                        if (user)
                            res.json({ 'message': 'User with this email exists.' });
                        else {
                            (0, console_1.log)("OK");
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
                            (0, console_1.log)(user);
                            user.save()
                                .then(() => {
                                (0, console_1.log)("User successfully saved.");
                                res.status(200).json({ 'message': '0' });
                            })
                                .catch((err) => {
                                (0, console_1.log)("Error saving user:", err);
                                res.status(400).json({ 'message': '-1' });
                            });
                        }
                    })
                        .catch(err => {
                    });
                }
            })
                .catch(err => {
            });
        };
    }
}
exports.UserController = UserController;
