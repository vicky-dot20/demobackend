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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = 'mongodb+srv://MohamedAbdulKather:riyAbu%40143@atlascluster.a5kdrzr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // rethrow the error to handle it in the index.js
    }
});
exports.default = connectToMongoDB;
