const Redis = require("ioredis").default; //applying default for autocompletion, dont need in import

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis Database Connected");
});

redis.on("error", (err) => {
  console.log("Error in Connecting Redis : ", err);
});

module.exports = redis;
