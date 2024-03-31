import User from '../models/user';
import e, * as express from 'express';
import { log } from 'console';
import MyConnections from '../models/MyConnections';
import user from '../models/user';


let id = 0;
let idDog = 0;
export class UserController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password })
            .then(user => {
                if (user) res.json(user);
                else {
                    res.json(null);
                }
            })
            .catch(err => {
            });
    }



    register = (req: express.Request, res: express.Response) => {
        User.findOne({ 'username': req.body.username })
            .then(user => {
                if (user) res.json({ 'message': 'User with this username exists.' })
                else {
                    log("OK")

                    User.findOne({ 'email': req.body.email })
                        .then(user => {
                            if (user) res.json({ 'message': 'User with this email exists.' });
                            else {
                                log("OK")

                        let user= new User({
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
                            languages:  req.body.languages,
                        })
                        log(user)
                        user.save()
                            .then(() => {
                                log("User successfully saved.");
                                res.status(200).json({'message': '0'});
                            })
                            .catch((err) => {
                                log("Error saving user:", err);
                                res.status(400).json({'message': '-1'});
                            });
                    }
                })
                .catch(err => {
                  
                });
        
            }

            })
            .catch(err => {
            });
    }

    connections = (req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let languages = req.body.languages;
        let users1 = [];


        User.find({
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
                } else {
                    res.json(null);
                }
            })
    }

    myconnections = (req: express.Request, res: express.Response) => {
        let username1 = req.body.username1;
        let username2 = req.body.username2;
        let connected = [];

        MyConnections.find({})
            .then((conn) => {
                if (conn.length > 0) {
                    for (let i = 0; i < conn.length; i++) {
                        if (conn[i].users.includes(username1) && conn[i].users.includes(username2)) {
                            connected.push(conn[i]);
                        }
                    }
                    res.json(connected);
                } else {
                    res.json(null);
                }
            })
    }

    connect = (req: express.Request, res: express.Response) => {
        let username1 = req.body.username;
        let username2 = req.body.username2;
        console.log(username1);
        console.log(username2);



        MyConnections.find({ $and: [{ users: username1 }, { users: username2 }] })
            .then((conn: any) => {
                if (conn.length > 0) {
                    console.log(conn[0]);
                    conn[0].connected = 2;
                    conn[0].save();

                } else {
                    let connection = new MyConnections({
                        users: [username1, username2],
                        connected: 1
                    })
                    console.log(connection);
                    connection.save();
                }
            })
    }
    allMyConnections = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        console.log(username);
        MyConnections.find({ users: { $in: username } })
            .then((connections) => {
                res.json(connections);
            })
    }






}