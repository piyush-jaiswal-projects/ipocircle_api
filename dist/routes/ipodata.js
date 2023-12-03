"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipoDataRouter = void 0;
const express_1 = __importDefault(require("express"));
const ipo_controllers_1 = require("../controllers/ipo-controllers");
exports.ipoDataRouter = express_1.default.Router();
exports.ipoDataRouter.get("/details", ipo_controllers_1.getIpoData);
// concise=true, type=sme|main