const assert = require('assert')
const todos = require('../models/todo.js')

let testObj1 = {
  name: 'John Doe',
  description: 'Unidentified man',
  completed: true
}

let testObj2 = {
  name: 'Jane Doe',
  description: 'Unidentified woman',
  completed: false
}
let testObjNoName = {
  description: 'Unidentified animal',
  completed: true
}

let testObjShortName = {
  name: 'Jane',
  description: 'Unidentified woman',
  completed: false
}

let testObjOnlyName = {
  name: 'Ethan'
}

let firstToDo

// List returns array of all Todos

todos.destroyAll()
assert.deepEqual(todos.list(), [], 'List should return an array of all Todos.')

// Create returns object

assert.strictEqual(typeof todos.create(testObj1), 'object', 'Create should return an object.')

// Create fails if no name provided

assert.strictEqual(todos.create(testObjNoName), 'Failed to create because no name provided.', 'Should not be able to create a new Todo without a name being provided.')

// Create returns object with the 3 keys

assert.deepEqual(Object.keys(todos.create(testObj2)), [ '_id', 'name', 'description', 'completed' ], 'Create should return an object with "name", "description" and "completed" as keys.')

// Create returns object with user's parameters

assert.strictEqual(todos.create(testObj2).name, testObj2.name, 'Name input should be identical.')
assert.strictEqual(todos.create(testObj2).description, testObj2.description, 'Description output value should be identical to create description input value.')
assert.strictEqual(todos.create(testObj2).completed, testObj2.completed, 'Completed output value should be identical to create completed input value.')

// Create fails if name shorted than 5 char provided

assert.strictEqual(todos.create(testObjShortName), 'Failed to create because name provided was too short.', 'Name input must be at least 5 characters long.')

// Create provides default values if only name provided

assert.deepEqual(todos.create(testObjOnlyName).description === 'Urgent' && todos.create(testObjOnlyName).completed === false, true, 'Default values for "description" and "completed" should be provided in create.')

// Create should provide a uuid

assert.strictEqual(todos.create(testObj2)._id !== todos.create(testObj2)._id && todos.create(testObj2)._id.length === 36, true, 'Create should generate UUIDs for each Todo.')

// Example Test - we expect that when we run destroyAll, it should return true to let us know it was successful

assert.strictEqual(todos.destroyAll(), true, 'DestroyAll should return true, to indicate success')

// We also expect the list should now be empty

assert.strictEqual(todos.list().length, 0, 'List should be empty after deleting all Todos')

// List should return todos array

todos.destroyAll()
todos.create(testObj2)
firstToDo = todos.list()[0]
assert.strictEqual(firstToDo['name'], 'Jane Doe', 'List did not return array, name test failed.')
assert.strictEqual(firstToDo['description'], 'Unidentified woman', 'List did not return array, description test failed.')
assert.ok(firstToDo._id, 'List did not return array, UUID test failed.')

// Show(id) should return specific Todo

todos.destroyAll()
todos.create(testObj2)
firstToDo = todos.list()[0]
assert.deepEqual(todos.show(firstToDo._id), firstToDo, 'Show(id) should return a specific Todo.')

// Update(id) should update the Todo

todos.destroyAll()
todos.create(testObj2)
firstToDo = todos.list()[0]
todos.update(firstToDo._id, {name: 'Tan Ah Kow', description: 'Identified man', completed: 'true'})
assert.strictEqual(firstToDo.name, 'Tan Ah Kow', 'Name not updated.')
assert.strictEqual(firstToDo.description, 'Identified man', 'Description not updated.')
assert.strictEqual(firstToDo.completed, true, 'Completion status not updated.')

// Destroy(id) should remove an identified Todo from the todos list

todos.destroyAll()
todos.create(testObj2)
firstToDo = todos.list()[0]
todos.destroy(firstToDo._id)
assert.strictEqual(todos.list().length, 0, 'Failed to destroy targeted Todo.')
