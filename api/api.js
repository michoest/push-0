const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const webpush = require("web-push");
const loki = require("lokijs");

dotenv.config();

const app = express();
const port = process.env.PORT;

// Define error handling
function asyncWrapper(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

class APIError extends Error {
  constructor(message, statusCode, info) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.info = info;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Set up web push
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (!vapidPublicKey || !vapidPrivateKey) {
  console.error(
    "VAPID keys are not set. Please check your environment variables."
  );
  process.exit(1);
}

webpush.setVapidDetails(
  "mailto:mail@michoest.com",
  vapidPublicKey,
  vapidPrivateKey
);

// Load or init database
const dbFile = process.env.DB_FILE;
const db = new loki(dbFile, {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000, // save every 4 seconds
});

const Subscriptions =
  db.getCollection("subscriptions") ||
  db.addCollection("subscriptions", { indices: ["endpoint"] });
console.log("Database initialized.");

app.use(cors("*"));
app.use(express.json());
app.use(morgan("combined"));

// ############################################################
// Routes
app.get(
  "/ping",
  asyncWrapper(async (req, res, next) => {
    res.send("pong");
  })
);

app.get(
    "/vapid",
    asyncWrapper(async (req, res, next) => {
      res.json(vapidPublicKey);
    })
  );

  app.get(
    "/subscriptions",
    asyncWrapper(async (req, res, next) => {
      const subscriptions = Subscriptions.find();

      return res.json(subscriptions);
    })
  );

app.post(
  "/subscribe",
  asyncWrapper(async (req, res, next) => {
    if (!Subscriptions.findOne({ endpoint: req.body.endpoint })) {
      Subscriptions.insert({
        endpoint: req.body.endpoint,
        subscription: req.body,
      });

      return res.json("Subscription added!");
    } else {
      const subscription = Subscriptions.findOne({
        endpoint: req.body.endpoint,
      });
      subscription.subscription = req.body;
      Subscriptions.update(subscription);
    }

    return res.json("Subscription updated!");
  })
);

app.post(
  "/notify",
  asyncWrapper(async (req, res, next) => {
    const notification = req.body.notification;

    const subscriptions = Subscriptions.find();
    const stats = { sent: 0, removed: 0 };
    await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          await webpush.sendNotification(
            subscription.subscription,
            JSON.stringify(notification)
          );
          stats.sent++;
        } catch (err) {
          Subscriptions.remove(subscription);
          stats.removed++;
          console.log(err);
        }
      })
    );

    return res.json({ stats });
  })
);

// Error handling with APIError
app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);

  return res.status(statusCode).json({
    success: false,
    notification: { message: err.message },
    ...err.info,
  });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle server shutdown
const shutdown = () => {
    console.log("Server is shutting down...");
    db.close(() => {
      console.log("Database closed.");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
