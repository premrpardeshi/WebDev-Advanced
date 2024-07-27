"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const otpLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Too many requests, please try again after 5 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});
const passwordResetLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many password reset attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});
const otpStore = {};
app.post("/generate-otp", otpLimiter, (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.json({ msg: "Email is required!" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email} is ${otp}`);
    res.json({ msg: "OTP sent successfully!" });
});
app.post("/reset-password", passwordResetLimiter, (req, res) => {
    console.log(req.body);
    const { email, newPassword, otp } = req.body;
    if (!email || !newPassword || !otp) {
        res.json({
            msg: "NEW PASSWORD, OTP AND EMAIL REQUIRED",
        });
    }
    if (otpStore[email] === otp) {
        console.log(`New password for ${email} is ${newPassword}`);
        delete otpStore[email];
        res.json({ msg: "Password reset successfully" });
    }
    else {
        res.json({ msg: "Invalid OTP" });
    }
});
app.listen(PORT, () => {
    console.log("Lisetening on port 3000");
});
