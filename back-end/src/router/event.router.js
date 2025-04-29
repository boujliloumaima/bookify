const express = require("express");
const router = express.Router();
const eventcontrollor = require("../controller/event.controller");

router.post("/", eventcontrollor.createEvent);
router.get("/", eventcontrollor.getAllEvents);
router.delete("/:id", eventcontrollor.deleteEvent);
router.put("/:id", eventcontrollor.updateEvent); // ➡️ nouvelle route
module.exports = router;
