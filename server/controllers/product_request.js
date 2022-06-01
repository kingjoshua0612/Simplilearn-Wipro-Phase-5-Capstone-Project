const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const ProductRequest = require("../models/product_request");

let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(ProductRequest);

exports.addRequest = asyncHandler(insertObjectInDB())
exports.deleteRequest = asyncHandler(deleteObjectFromDB)
exports.getRequest = asyncHandler(getAllObjectsFromDB)