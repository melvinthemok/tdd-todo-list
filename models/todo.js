const uuidGenerator = require('uuid/v4')

let todos = require('../data.json').todos

function save () {
  const json = JSON.stringify({ todos: todos })
  fs.writeFile('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  let newObj = {
    name: params.name,
    description: params.description || 'Urgent',
    completed: params.completed || false,
    _id: uuidGenerator()
  }
  if (!newObj.name) {
    return 'Failed to create because no name provided.'
  } else if (newObj.name.length < 5) {
    return 'Failed to create because name provided was too short.'
  }
  todos.push(newObj)
  return newObj
}

// READ (list & show)
function list () {
  return todos
}
function show (id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      return todos[i]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, updatedParams) {
  let toUpdateDo = show(id)
  toUpdateDo.name = updatedParams[0]
  toUpdateDo.description = updatedParams[1]
  toUpdateDo.completed = updatedParams[2]
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  let targetedIndex = todos.indexOf(show(id))
  todos.splice(targetedIndex, 1)
  return true
}
function destroyAll () {
  todos.length = 0
  return true
}

module.exports = {
  create: create,
  list: list,
  show: show,
  update: update,
  destroy: destroy,
  destroyAll: destroyAll,
}
