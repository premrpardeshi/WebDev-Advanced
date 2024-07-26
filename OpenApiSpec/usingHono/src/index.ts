import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { UserSchema } from "./outputs";
import { ParamsSchema } from "./inputs";
import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

const getUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

const app = new OpenAPIHono();

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});
app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
