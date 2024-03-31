"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const console_1 = require("console");
const MyConnections_1 = __importDefault(require("../models/MyConnections"));
const Poruka_1 = __importDefault(require("../models/Poruka"));
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
        this.poruke = (req, res) => {
            const korisnickoIme = req.body.korisnickoIme;
            console.log(korisnickoIme);
            Poruka_1.default.find({ $or: [{ 'korisnickoIme1': korisnickoIme }, { 'korisnickoIme2': korisnickoIme }] })
                .then((data) => {
                if (data) {
                    res.json(data);
                }
                else {
                    console.log([]);
                    res.json([]);
                }
            })
                .catch((err) => {
                console.error('Greška prilikom pretrage poruka:', err);
                res.status(500).json({ error: 'Greška prilikom pretrage poruka' });
            });
        };
        this.posaljiPoruku = (req, res) => {
            let korisnickoIme = req.body.username;
            let korisnickoIme1 = req.body.username1;
            Poruka_1.default.findOne({
                $or: [
                    { $and: [{ "korisnickoIme1": korisnickoIme }, { "korisnickoIme2": korisnickoIme1 }] },
                    { $and: [{ "korisnickoIme1": korisnickoIme1 }, { "korisnickoIme2": korisnickoIme }] }
                ]
            }).then((data) => {
                if (data) {
                    console.log("Stara poruka:");
                    console.log(req.body.novaPoruka);
                    data.poruke.push(req.body.novaPoruka);
                    console.log(data);
                    const data1 = new Poruka_1.default({
                        poruke: data.poruke,
                        korisnickoIme1: data.korisnickoIme1,
                        korisnickoIme2: data.korisnickoIme2,
                        slika1: data.slika1,
                        slika2: data.slika2
                    });
                    console.log(data1);
                    data1.save().then(() => {
                        console.log("Poruka poslata.");
                        res.json("Poruka poslata.");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom čuvanja nove poruke.' });
                    });
                    Poruka_1.default.deleteOne({ _id: data._id }).then(() => {
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom brisanja postojeće poruke.' });
                    });
                }
                else {
                    const data1 = new Poruka_1.default({
                        poruke: [req.body.novaPoruka],
                        korisnickoIme1: req.body.korisnickoIme1,
                        korisnickoIme2: req.body.korisnickoIme2,
                    });
                    // Sačuvati novi dokument
                    data1.save().then(() => {
                        res.json("Nova poruka sačuvana.");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom čuvanja nove poruke.' });
                    });
                }
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Došlo je do greške prilikom pretrage poruka.' });
            });
        };
    }
}
exports.UserController = UserController;
