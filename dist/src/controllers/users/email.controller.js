"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.saveUserMail = void 0;
const db_1 = require("../../db");
const db_2 = __importDefault(require("../../db"));
const user_email_1 = __importStar(require("../../models/users/user_email"));
const saveUserMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_2.default)();
        const data = req.body;
        const newMail = new user_email_1.NewUserMail();
        newMail.mail = data.mail;
        const createNewMail = yield db_1.myDataSource
            .getRepository(user_email_1.default)
            .create(newMail);
        const saveNewMail = yield db_1.myDataSource
            .getRepository(user_email_1.default)
            .save(createNewMail);
        if (!saveNewMail.mail) {
            res.status(400).json({ success: false, msg: "Mail not added" });
        }
        res.status(200).json({
            success: true,
            msg: "Mail added",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Mail not added" });
    }
});
exports.saveUserMail = saveUserMail;
