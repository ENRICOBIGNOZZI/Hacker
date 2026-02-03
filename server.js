const express = require("express");
const path = require("path");

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  // Ensure the error is visible even if the process exits quickly.
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
  process.exit(1);
});

const app = express();
app.use(express.json());

// serve index.html esplicitamente su /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// endpoint per logging evento (anonimo)
app.post("/event", (req, res) => {
  const { event, ts } = req.body || {};
  console.log({ event, ts });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
// Bind explicitly to IPv4. On some macOS setups, binding only to IPv6 can make
// 127.0.0.1 / localhost behave inconsistently.
const server = app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on http://127.0.0.1:${PORT}`)
);
server.on("error", (err) => {
  console.error("listen error", err);
  process.exit(1);
});
