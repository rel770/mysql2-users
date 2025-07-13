import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World! MySQL Server is running!");
});

export default router;
