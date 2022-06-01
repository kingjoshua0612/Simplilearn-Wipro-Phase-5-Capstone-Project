const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
const Products = require("../models/Products");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Users);

//get the user's cart
exports.getUserCart = asyncHandler(getObjectsByQueryFromDB);

//input product_id array in req.body by the key product_ids
exports.createUserCart = asyncHandler(async (req, res, next) => {
    let { product_ids } = req.body;
    let id = req.params.id;

    let products = await Products.find({ id: { $in : product_ids } })

    console.log(products)
    if (products.length > 0){
        Users.findOneAndUpdate( { id: req.params.id }, { $push: { cart: products }}, { new: true })
        .then((user) => 
          res.status(200).json({ user, message: "Success" })
        )
        .catch((err) =>
          res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be inserted, Err ${err}`})
        );
    } else {
        res.status(400).json({ status: false, message: `Error in product Ids, Such products does not exist in database`})
    }
});

//input product_id array in req.body by the key product_ids
exports.editUserCart = asyncHandler(async (req, res, next) => {
    let { product_ids } = req.body;
    
    let products = await Products.find({ id: { $in : product_ids } })

    if (products){
        Users.findOneAndUpdate({id: req.params.id}, { cart: products }, { new: true })
        .then((user) => 
          res.status(200).json({ user, message: "Success" })
        )
        .catch((err) =>
          res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be inserted, Err ${err}`})
        );
    } else {
        res.send(400).json({ status: false, message: `Error in product Ids, Such product does not exist in database`})
    }
});

//empty the whole cart
exports.deleteUserCart = asyncHandler(async (req, res, next) => {
    Users.findOneAndUpdate({id: req.params.id}, { cart: [] }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be deleted, Err ${err}`})
    );
});