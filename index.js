const express = require("express");
const pg = require("pg");

const app = express();
const pool = new pg.Pool();

const queryHandler = (req, res, next) => {
  pool
    .query(req.sqlQuery)
    .then(r => res.json(r.rows || []))
    .catch(next);
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to EQ Works 😎");
});

app.get(
  "/events/hourly",
  (req, res, next) => {
    const pageNumber = parseInt(req.query.page);
    const pageSize = 50;

    req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT ${pageSize}
    OFFSET ${pageSize * pageNumber - 1};
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/events/daily",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 365;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/stats/hourly",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/stats/daily",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
    return next();
  },
  queryHandler
);

app.get(
  "/poi",
  (req, res, next) => {
    req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `;
    return next();
  },
  queryHandler
);

app.listen(process.env.PORT || 5555, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`);
  }
});

// last resorts
process.on("uncaughtException", err => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});
