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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
class PubSubManager {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    static getInstance() {
        if (PubSubManager.instance) {
            return PubSubManager.instance;
        }
        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance;
    }
    userSubscribe(userId, stock) {
        var _a;
        if (!PubSubManager.getInstance().subscriptions.get(stock))
            PubSubManager.getInstance().subscriptions.set(stock, []);
        else
            (_a = PubSubManager.getInstance().subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.push(userId);
        this.redisClient.subscribe(stock, (message) => {
            var _a;
            if (((_a = PubSubManager.getInstance().subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                this.redisClient.subscribe(stock, (message) => {
                    this.handleMessage(stock, message);
                });
            }
            console.log(`Subscribed to Redis channel: ${stock}`);
        });
    }
    userUnSubscribe(userId, stock) {
        var _a, _b;
        this.subscriptions.set(stock, ((_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.filter((sub) => sub !== userId)) || []);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }
    handleMessage(stock, message) {
        var _a;
        console.log(`Message received on channel ${stock}: ${message}`);
        (_a = PubSubManager.getInstance()
            .subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.quit();
        });
    }
}
exports.PubSubManager = PubSubManager;
