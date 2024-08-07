"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const requestCount = new prom_client_1.default.Counter({
    name: "request_count",
    help: "Total request count",
    labelNames: ["method", "route", "status_code"],
});
function requestCounter(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const end = Date.now();
        const time = end - start;
        console.log("It took " + time + " ms.");
        requestCount.inc({
            method: req.method,
            route: req.path,
            status_code: res.statusCode,
        });
    });
    next();
}
exports.requestCounter = requestCounter;
