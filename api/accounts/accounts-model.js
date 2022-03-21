const knex = require("knex");
const config = require('../../knexfile')
const db = knex(config.development);


const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts")
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()

}

const create = account => {
  // DO YOUR MAGIC
  const [id] =  db('accounts').insert({account})
  return getById(id)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  db("accounts").where("id", id).update({ account })
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  db("accounts").where("id", id).del()
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
