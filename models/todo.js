const uuidGenerator = require('uuid/v4')
const fs = require('fs')

let todos = require('../data.json').todos

function save () {
  const json = JSON.stringify({ todos: todos })
  fs.writeFileSync('data.json', json, 'utf8')
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
  save()
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

  if (toUpdateDo && typeof updatedParams === 'object') {
    if (updatedParams.name === '' || updatedParams.name.length < 5) {
      return false
    }

    toUpdateDo.name = updatedParams.name || toUpdateDo.name
    toUpdateDo.description = updatedParams.description || toUpdateDo.description
    if (typeof updatedParams.completed === 'boolean') {
      toUpdateDo.completed = updatedParams.completed
    }

    save()
    return true
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  let targetedIndex = todos.indexOf(show(id))
  todos.splice(targetedIndex, 1)
  save()
  return true
}

function destroyAll () {
  todos.length = 0
  save()
  return true
}

module.exports = {
  create: create,
  list: list,
  show: show,
  update: update,
  destroy: destroy,
  destroyAll: destroyAll
}
