"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapispec_1 = require("./openapispec");
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
];
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name) {
        const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
        res.json(filteredUsers);
    }
    else {
        res.json(users);
    }
});
app.get("/", (req, res) => {
    console.log("get");
    res.json({
        msg: "Hi",
    });
});
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapispec_1.spec));
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
