"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.histogrammer = exports.httpRequestDurationMicroseconds = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});
function histogrammer(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const end = Date.now();
        exports.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.path,
            code: res.statusCode,
        }, end - start);
    });
    next();
}
exports.histogrammer = histogrammer;
