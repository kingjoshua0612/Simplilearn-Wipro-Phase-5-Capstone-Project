const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Employee = require("../models/employees");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Employee);

exports.getEmployeeById = asyncHandler(async(req,res,next)=>{
    let id = req.params.id
    Employee.find({id:id})
    .then(data=>res.status(200).json({status:true,data,message:"Found Employee"}))
    .catch(err=>res.status(422).json({status:false,message:`There was an error! => ${err}`}))
  })

exports.login = asyncHandler(async (req,res,next)=>{
    const {id,password} = req.body

    let [check] = await Employee.find({id:id})

    if(check && check.id){
        if(check.password === password){
            delete check.password
            res.status(200).json({status:true,message:"Welcome Employee"})
        }else{
            res.status(200).json({status:false,message:"Failed login"})
        }
    }else{
        res.status(200).json({status:false,message:"Failed login"})
    }
})

exports.getEmployeeById = asyncHandler(async (req, res, next) => {
    // let username = req.params.userName
    // User.find({userName:username})
    // .then(user=>res.status(200).json({status:true,user,message:"Found User"}))
    // .catch(err=>res.status(422).json({status:false,message:`There was an error! => ${err}`}))
    let id = req.params.id
    console.log(id)
    Employee.find({id:id})
    .then(data=>res.status(200).json({status:true,data,message:"Found Employee!"}))
    .catch(err=>res.status(422).json({status:false,message:`Issue finding employee => ${err}`}))
})

exports.updatePassword = asyncHandler(async (req, res, next) => {
    let emp_id = req.params.id
    let password = req.body['password']
    Employee.findOneAndUpdate({id: emp_id}, { $set: {password:password} })
    .then((emp) => //console.log(emp))
      emp.status(200).json({ status:true,emp, message: "Success! Password was changed for Employee" }))
    .catch((err) => //console.log("===> " + err))
      res.status(200).json({ status: true, message: "Success! Password was changed for Employee" }))
});

exports.addEmployee = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email} = req.body
    let password = makePassword(email)
    let count = 1
    let id = ""
    
    while(true) {
        id = makeEmployeeID(firstName, lastName, count)
        let [check] = await Employee.find({id: id})

        if(check) {
            count++
        } else {
            break
        }
    }
    req.body.id = id
    req.body.password = password
    let DBstate = {id, firstName, lastName, email, password}
    insertObjectInDB(DBstate)(req, res, next);
});

exports.deleteEmployee = asyncHandler(deleteObjectFromDB);

exports.updateEmployee = asyncHandler(updateObjectInDB());

exports.getAllEmployees = asyncHandler(getAllObjectsFromDB);

exports.getEmployeeByQuery = asyncHandler(getObjectsByQueryFromDB);

function makePassword(email) {
    let min = Math.ceil(100)
    let max = Math.floor(1000)
    let num = Math.floor(Math.random() * (max - min) + min)

    return email.split("@")[0] + "" + num
  }

function makeEmployeeID(fName, lName, count) {
    return fName.charAt(0).toLowerCase() + lName.toLowerCase() + count
  }
