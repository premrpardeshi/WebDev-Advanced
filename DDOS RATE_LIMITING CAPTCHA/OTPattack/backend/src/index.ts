import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;

app.use(express.json());

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many requests, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many password reset attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const otpStore: Record<string, string> = {};

app.post("/generate-otp", otpLimiter, (req: any, res: any) => {
  const email = req.body.email;

  if (!email) {
    res.json({ msg: "Email is required!" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = otp;

  console.log(`OTP for ${email} is ${otp}`);

  res.json({ msg: "OTP sent successfully!" });
});

app.post("/reset-password", passwordResetLimiter, (req: any, res: any) => {
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
  } else {
    res.json({ msg: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log("Lisetening on port 3000");
});
