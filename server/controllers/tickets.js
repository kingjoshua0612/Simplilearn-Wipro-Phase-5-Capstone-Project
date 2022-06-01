const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
const Tickets = require("../models/Tickets");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Tickets);

exports.getReports = asyncHandler(async (req, res, next) => {
  
});

exports.createTicket = asyncHandler(insertObjectInDB())

exports.updateTicket = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let { complainant_id, description } = req.body;

    if (Array.isArray(complainant_id)) return res.status(400).json({ status: false, message: `Please Enter complaintant's ID as a String`});

    let [complainant] = await Users.find({ id: complainant_id });
    let [check] = await Tickets.find({id: id});
    if (!check) return res.status(400).json({ status: false, message: 'No Resource Found in DB'});

    let DBstate = {id, complainant, description};

    updateObjectInDB(DBstate)(req, res, next);
});

exports.getAllTickets = asyncHandler(getAllObjectsFromDB);

exports.getTicket = asyncHandler(getObjectsByQueryFromDB);

exports.deleteTicket = asyncHandler(deleteObjectFromDB);