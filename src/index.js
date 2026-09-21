import "./instrument.js";
import express from "express";
// import * as Sentry from "@sentry/node";
import "dotenv/config";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import hostsRouter from "./routes/hosts.js";

const app = express();

// // Sentry
// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({
//       tracing: true,
//     }),
//     // enable Express.js middleware tracing
//     new Sentry.Integrations.Express({
//       app,
//     }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
// });

// // Trace incoming requests
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

// Resource routes
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/hosts", hostsRouter);
app.get(`/health`, (req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const { description } = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf-8"));
  res.json({
    success: true,
    message: `${description} is running successfully!`,
    timestamp: new Date().toISOString(),
  });
});

// Login
app.use("/login", loginRouter);

// // Trace errors
// app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
