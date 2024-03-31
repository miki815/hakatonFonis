"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const console_1 = require("console");
const MyConnections_1 = __importDefault(require("../models/MyConnections"));
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
                                points: 0,
                                age: req.body.age,
                                type: req.body.type,
                                languages: req.body.languages,
                                language: req.body.language
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
        this.connections = (req, res) => {
            let city = req.body.city;
            let languages = req.body.languages;
            let users1 = [];
            user_1.default.find({
                'city': city
            })
                .then((users) => {
                if (users.length > 0) {
                    for (let i = 0; i < users.length; i++) {
                        const hasCommonElement = languages.some(item => users[i].languages.includes(item));
                        if (hasCommonElement) {
                            users1.push(users[i]);
                        }
                    }
                    console.log("Added: " + users1);
                    res.json(users1);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.myconnections = (req, res) => {
            let username1 = req.body.username1;
            let username2 = req.body.username2;
            let connected = [];
            MyConnections_1.default.find({})
                .then((conn) => {
                if (conn.length > 0) {
                    for (let i = 0; i < conn.length; i++) {
                        if (conn[i].users.includes(username1) && conn[i].users.includes(username2)) {
                            connected.push(conn[i]);
                        }
                    }
                    res.json(connected);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.connect = (req, res) => {
            let username1 = req.body.username;
            let username2 = req.body.username2;
            console.log(username1);
            console.log(username2);
            MyConnections_1.default.find({ $and: [{ users: username1 }, { users: username2 }] })
                .then((conn) => {
                if (conn.length > 0) {
                    console.log(conn[0]);
                    conn[0].connected = 2;
                    conn[0].save();
                }
                else {
                    let connection = new MyConnections_1.default({
                        users: [username1, username2],
                        connected: 1
                    });
                    console.log(connection);
                    connection.save();
                }
            });
        };
        this.allMyConnections = (req, res) => {
            let username = req.body.username;
            console.log(username);
            MyConnections_1.default.find({ users: { $in: username } })
                .then((connections) => {
                res.json(connections);
            });
        };
    }
}
exports.UserController = UserController;
