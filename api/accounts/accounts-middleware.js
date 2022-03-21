const Accounts = require('./accounts-model')
const db = require('../../data/db-config')



exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
if(req.body.name === undefined || req.body.budget === undefined ){
  res.status(400).json({message:"name and budget are required"})
} else if (req.body.name.trim() > 3 || req.body.name.trim() <100 ) {
  res.status(400).json({message:"name of account must be between 3 and 100"})
} else if (req.body.budget !== Number){
  res.status(400).json({message:"budget of account must be a number"})
} else if (req.body.budget < 0 || req.body.budget > 1000000){
  res.status(400).json({message:"budget of account is too large or too small"})
}else {
  next();
}
}






exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
if(db('accounts').where('name', req.body.name.trim()).first()){
  res.status(400).json({message:"that name is taken"})
}else {
  next()
}
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
if(!Accounts.getById(req.params.id)){
  res.status(400).json({message: 'account not found'})
} else{
 next();
}

}
