"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_model_1 = __importDefault(require("../models/signup_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield signup_model_1.default.findOne({ email });
        const passwordMatch = bcrypt_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "inavlid password" });
        }
        if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
            return res.status(400).json({ message: "user is not verified" });
        }
        const body = {
            _id: user === null || user === void 0 ? void 0 : user._id,
            email: user === null || user === void 0 ? void 0 : user.email
        };
        const jwt_secret = 'it_is_my_secret';
        const token = jsonwebtoken_1.default.sign({ user: body }, jwt_secret);
        res.status(200).json({ token, message: "successfully loggedin" });
    }
    catch (error) {
        res.status(500).json({
            message: "Internel server error"
        });
    }
}));
exports.default = router;
