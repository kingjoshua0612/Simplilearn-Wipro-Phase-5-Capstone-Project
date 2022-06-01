const getAllObjectsFromDB = (model) => async (req, res, next)  => {
    model.find({})
    .then((data) =>
    res.status(200).json({data, message: `Success` })
    )
    .catch(err => 
    res.status(400).json({ status: false, message: `Request failed ! Error : ${err}` })
    );
}

const getObjectsByQueryFromDB = (model) => async (req, res, next)  => {
    let queryObj = {};
    zObject.entries(req.query).forEach(([key,val]) => queryObj[key] = {$regex: `^${val}`})

    model.find(queryObj)
    .then(data => res.status(200).json({ message: `Success`, data}))
    .catch(err => res.status(400).json({ status: false, message: `Bad request!!  Could not fetch. Err: ${err}`}))
}

const deleteObjectFromDB = (model) => async (req, res, next)  => {

  if (!req.params.id) return res.status(500).json({ status: false, message: "Wrong Request!! Please enter ID of the resource to be deleted"});

  let [check] = await model.find({id: req.params.id});
  if (!check) {
      res.status(422).json({ status: false, message: `Resource doesnt exist!!`});
  } else {
      model.deleteOne({ id: req.params.id })
      .then(response =>
      res.status(200).json({ data: response, message: `Success!! Resource with id ${req.params.id} deleted.` })
      )
      .catch(err => 
      res.status(400).json({ status: false, message: `Could not delete the Resource. Request failed ! Error : ${err}` })
      );
  }
}

const insertObjectInDB = (model) => (inputState = null) => async (req, res, next) => {
  inputState =  (inputState == null) ? req.body : inputState;
  console.log(req.body)
  const { id } = req.body;
  
  if (!id) return res.status(500).json({ status: false, message: "Wrong Request"});

  let [check] = await model.find({id});
  if (check && check.id == id) {
    res.status(200).json({ status: false, message: `Duplicate ID!! ID:${id} already exists`});
  }
  else{
    let [check] = await model.insertMany(req.body);

    if (check && check.id) {
      res.status(200).json({ status: true, message: `Resource is added in database with ID: ${check.id}.` });
    } else {
      res.status(200).json({ status: false, message: "There was a problem while inserting in DB, please try again." });
    }
  }
}

const updateObjectInDB = (model) => (inputState = null) => async (req, res, next) => {
    inputState =  !inputState ? req.body : inputState;

    const id = req.params.id;
    let [check] = await model.find({id});
    console.log(id)
    console.log(req.body)
    console.log(inputState)

    if (!check) return res.status(404).json({ status: false, message: `ID: ${id} is not available in DB`})

    model.findOneAndUpdate({id: id}, inputState, { new: true })
    .then((data) =>
      res.status(200).json({ data, message: `Success!! ${id} updated in DB` })
    )
    .catch(err =>
      res.status(400).json({ status: false, message: `ID ${id} could not be inserted, Err ${err}` })
    );
}

module.exports = (model) => {
    return(
        {
            getAllObjectsFromDB: getAllObjectsFromDB(model), 
            getObjectsByQueryFromDB: getObjectsByQueryFromDB(model),
            updateObjectInDB: updateObjectInDB(model),
            deleteObjectFromDB: deleteObjectFromDB(model),
            insertObjectInDB: insertObjectInDB(model)
        }
    )
}