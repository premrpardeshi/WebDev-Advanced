import express from "express";
import swaggerUi from "swagger-ui-express";
import { spec } from "./openapispec";

const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

app.get("/users", (req, res) => {
  const name: string | undefined = req.query.name as string | undefined;

  if (name) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

app.get("/", (req: any, res: any) => {
  console.log("get");

  res.json({
    msg: "Hi",
  });
});

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(spec));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
