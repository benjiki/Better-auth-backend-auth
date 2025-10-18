import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();

// mount auth handler
// app.all("/api/auth/*", toNodeHandler(auth));
app.all("/api/auth/{*any}", toNodeHandler(auth));

// then other middlewares & routes
app.use(express.json());
//global error handler
app.use((err, req, res, next) => {
  return res.status(err.status | 500).json(err.message);
});
// a protected route example
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
