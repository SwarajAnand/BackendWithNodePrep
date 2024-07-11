const express = require("express");
const userJobController = require("../controller/jobController");
const router = express.Router();
const { createJob, listJob, updateJob, deletejob } = userJobController;

router.post("/api/jobs", createJob);

router.get("/api/jobs", listJob);

router.put("/api/jobs/:id", updateJob);

router.delete("/api/jobs/:id", deletejob);

module.exports = router;
