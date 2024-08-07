"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeUserGauger = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const activeUserGauge = new prom_client_1.default.Gauge({
    name: "active_users",
    help: "Total number users with pending requests",
});
function activeUserGauger(req, res, next) {
    activeUserGauge.inc();
    res.on("finish", () => {
        activeUserGauge.dec();
    });
    next();
}
exports.activeUserGauger = activeUserGauger;
