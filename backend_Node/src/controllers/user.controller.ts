import User from '../models/user';
import e, * as express from 'express';
import { log } from 'console';

let id=0;
let idDog=0;
export class UserController{

    login= (req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let password= req.body.password;
        
        User.findOne({'username': username, 'password': password})
        .then(user => {
            if(user)  res.json(user);
            else{
                res.json(null);
            }
        })
        .catch(err => {
        });
    }
    
   

    register=(req: express.Request, res: express.Response)=>{
        User.findOne({'username': req.body.username})
        .then(user => {
            if(user) res.json({'message': 'User with this username exists.'})
            else{
                log("OK")

                User.findOne({'email': req.body.email})
                .then(user => {
                    if(user) res.json({'message': 'User with this email exists.'});
                    else{
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
   


}