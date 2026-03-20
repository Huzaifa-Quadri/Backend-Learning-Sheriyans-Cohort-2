import { Router } from "express";
import testController from "../controllers/test.controller.js";

const test = Router();

/**
 * @route - GET/api/test
 * @description - Just a Test API
 * @access - public
 */
test.get("/test", testController);

export default test;
