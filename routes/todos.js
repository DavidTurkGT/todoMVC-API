const express   = require('express');
const router    = express.Router();
const models    = require('../models');
////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
  //return a JSON array of todo items
  models.todo.findAll().then( (todos) => {
    console.log("Found this: ", todos);
    res.send("Check console");
  });
});

router.post('/', (req, res) =>{
  //post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
  //TODO: add body validation
  let newTodo = {
    title: req.body.title,
    order: Number(req.body.order),
    completed: req.body.completed == 'true'
  }
  models.todo.create(newTodo).then( (newTodo) => {
    console.log("Todo item created: ", newTodo);
    res.send("Check console");
  })
});

router.get('/:id', (req, res) =>{
  //get a specific todo item using the ID parameter
  res.send("This will return a specific item (using ID parameter)");
});

router.put('/:id', (req, res) =>{
  //update a todo item. Returns the modified todo item.
  res.send("This will update a specific item (using ID parameter)");
});

router.patch('/:id', (req, res) =>{
  //partially update a todo item. Returns the modified todo item.
  res.send("This will partially update a specific todo item (using ID parameter)");
});

router.delete('/:id', (req, res) =>{
  //deletes a todo item. Returns the todo item that was deleted.
  res.send("This will destroy a specific item (using ID parameter)");
});
////////////////////////////////////////////////////////////////////////////////
module.exports = router;
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
