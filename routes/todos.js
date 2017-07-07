const express   = require('express');
const router    = express.Router();
const models    = require('../models');
////////////////////////////////////////////////////////////////////////////////
//Middleware
function validateBody (req, res, next) {
  req.checkBody('title', 'Title cannot be empty').notEmpty();
  req.checkBody('order', 'Order cannot be empty').notEmpty();
  req.checkBody('completed', 'Completed cannot be empty').notEmpty();
  let errors = req.validationErrors();
  if(errors) res.status(400).send("Bad request. Try again");

  next();
}
////////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  //return a JSON array of todo items
  todos = await models.todo.findAll()
    .catch( (err) => res.status(400).send("Bad request. Try again") );
  if(todos){
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(todos);
  }
  else{
    res.status(500).send("Internal server error!");
  }
});

router.post('/', validateBody, async (req, res) =>{
  //post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
  let newTodo = {
    title: req.body.title,
    order: Number(req.body.order),
    completed: req.body.completed == 'true'
  }
  //Save new Todo and send back JSON
  newTodo = await models.todo.create(newTodo)
    .catch( (err) => res.status(500).send("Internal server error!"));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(newTodo);
});

router.get('/:id', async (req, res) =>{
  //get a specific todo item using the ID parameter
  let todo = await models.todo.findById(req.params.id)
    .catch( (err) => res.status(500).send("Internal server error"));
  if(todo){
    res.setHeader('Content-Type','application/json');
    res.status(200).json(todo);
  }
  else{
    res.status(404).send("Error: todo not found");
  }
});

router.put('/:id', validateBody, async (req, res) =>{
  //update a todo item. Returns the modified todo item.
  let todo = await models.todo.update({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  },
  {
    where: { id: req.params.id}
  })
    .catch( (err) => res.status(500).send("Internal server error"));
  console.log("Todo: ",todo);
  if(todo[0]){
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(todo);
  }
  else res.status(404).send("Error: todo not found");
});

router.patch('/:id', (req, res) =>{
  //partially update a todo item. Returns the modified todo item.
  res.send("This will partially update a specific todo item (using ID parameter)");
});

router.delete('/:id', async (req, res) =>{
  //deletes a todo item. Returns the todo item that was deleted.
  let todo = await models.todo.destroy( {
    where: { id: req.params.id}
  })
    .catch( (err) => res.status(500).send("Internal server error"));
  console.log("Todo item deleted: ", todo);
  if(todo){
    res.setHeader('Content-Type','application/json');
    res.status(200).json(todo);
  }
  else{
    res.status(404).send("Error: todo not found");
  }
});
////////////////////////////////////////////////////////////////////////////////
module.exports = router;
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
