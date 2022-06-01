const asyncHandler = require("../middlewares/async");
const Products = require("../models/Products");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Products);

//exports.addProduct = asyncHandler(insertObjectInDB())
exports.addProduct = asyncHandler(async (req, res, next)=>{
    let {id, price, quantity } = req.body
    let [check] = await Products.insertMany([{id:id,price:price,quantity:quantity}],{new:true})
    .then(prod=>res.status(200).json({status:true,prod,message:"Success! Product was inserted"}))
    .catch(err=>res.status(422).json({status:false,message:`There was an error with inserting! => ${err}`}))
})


exports.deleteProduct = asyncHandler(deleteObjectFromDB)
// exports.deleteProduct = asyncHandler(async (req, res, next)=>{
//     let id = req.params.id
//     let [check] = await Products.deleteOne({id:id},{new:true})
//     .then(prod=>res.status(200).json({status:true,message:"Success! Product was deleted"}))
//     .catch(err=>res.status(422).json({status:false,message:`There was an error with deleting! => ${err}`}))
// })

//exports.updateProduct = asyncHandler(updateObjectInDB())
exports.updateProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body)
    Products.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((product) => 
      res.status(200).json({status: true, product, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `id ${String(req.params.id)} could not be inserted, Err ${err}`}));
});


exports.getAllProducts = asyncHandler(getAllObjectsFromDB)

exports.getProductsByQuery = asyncHandler(getObjectsByQueryFromDB)
