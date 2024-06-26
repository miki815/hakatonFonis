"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const game_router_1 = __importDefault(require("./routers/game.router"));
const kviz_router_1 = __importDefault(require("./routers/kviz.router"));
const login_routes_1 = __importDefault(require("./routers/login.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//app.use(bodyParser.json());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/fonis');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/game', game_router_1.default);
router.use('/kviz', kviz_router_1.default);
app.use('/', router);
app.use('/users', login_routes_1.default);
app.listen(4000, () => console.log(`Express server running on port 4000`));
