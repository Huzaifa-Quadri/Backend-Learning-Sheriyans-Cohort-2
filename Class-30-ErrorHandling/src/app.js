import express from "express";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import test from "./routes/test.routes.js";

const app = express();
app.use("/api", authRouter);
app.use("/api", test);

//We use in last as for handling error through middleware
app.use(errorHandler);
export default app;
