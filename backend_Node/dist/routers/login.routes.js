"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/connestions').post((req, res) => new user_controller_1.UserController().connections(req, res));
userRouter.route('/myconnections').post((req, res) => new user_controller_1.UserController().myconnections(req, res));
userRouter.route('/allMyConnections').post((req, res) => new user_controller_1.UserController().allMyConnections(req, res));
userRouter.route('/connect').post((req, res) => new user_controller_1.UserController().connect(req, res));
userRouter.route('/updateCurrentCity').post((req, res) => new user_controller_1.UserController().updateCurrentCity(req, res));
userRouter.route('/allMyConnections').post((req, res) => new user_controller_1.UserController().allMyConnections(req, res));
userRouter.route('/posaljiporuku').post((req, res) => new user_controller_1.UserController().posaljiPoruku(req, res));
userRouter.route('/poruke').post((req, res) => new user_controller_1.UserController().poruke(req, res));
exports.default = userRouter;
