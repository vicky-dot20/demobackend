"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const databse_1 = __importDefault(require("./config/databse"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(0, databse_1.default)();
const base = "/demo";
app.use(base, signup_1.default);
app.use(base, signin_1.default);
const port = 4000;
app.listen(port).on("listening", () => {
    console.log(`Listening on http://localhost:${port} `);
});
