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
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup_model_1 = __importDefault(require("../models/signup_model"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const router = express_1.default.Router();
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
router.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const otp = generateOtp();
        const otpExpires = Date.now() + 300000;
        const isVerified = false;
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const user = new signup_model_1.default({
            username,
            email,
            password: hashedPassword,
            isVerified,
            otp,
            otpExpires
        });
        user.save();
        yield (0, mailer_1.default)(user.email, 'Your OTP for verification', `Your OTP for verification is ${otp}`);
        res.status(200).json({ message: 'successfully register , otp has sent to your mail', user });
    }
    catch (error) {
        res.status(500).json({ error: 'internel server error' });
    }
}));
router.post('/verify-otp/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { otp } = req.body;
        const user = yield signup_model_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Ivalid otp ' });
        }
        user.isVerified = true;
        user.otp = "";
        yield user.save();
        return res.status(200).json({ message: 'OTP is verified ' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
router.get('/getUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = yield signup_model_1.default.find();
        res.send(userDetails);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/getUserById/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userDetails = yield signup_model_1.default.findById(userId);
        res.send(userDetails);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
