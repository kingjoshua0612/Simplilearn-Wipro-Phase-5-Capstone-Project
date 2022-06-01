const express = require("express");
const tickets = require("../../controllers/tickets");


const router = express.Router();

//localhost:4100/v1/tickets/getalltickets -> returns data object data.description = "--desc stored in DB"
router.get("/getalltickets", tickets.getAllTickets);
//Fetch all tickets by PARTIAL id or PARTIAL description using query params.
router.get("/getticket", tickets.getTicket);

router.post("/createticket", tickets.createTicket);

router.put("/updateticket/:id", tickets.updateTicket);

//localhost:4100/v1/tickets/deletetticket/1 -> delets that Ticket from DB
router.delete("/deletetticket/:id", tickets.deleteTicket);

module.exports = router;
