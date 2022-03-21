const Accounts = require('./accounts-model')
const router = require('express').Router()
const {checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId} = require('./accounts-middleware')
const dbConfig = require('../../data/db-config')



router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/',checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then(newAccount => {
      res.status(201).json(newAccount)
    } 
  ).catch(err => {
    next(err)
  })
})

router.put('/:id',checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
  .then(updatedAccount => {
    res.json(updatedAccount)
  })
  .catch(err => {
    next(err)
  })
});

router.delete('/:id', checkAccountId,(req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(res.json(req.account))
  .catch(err => {
    next(err)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
