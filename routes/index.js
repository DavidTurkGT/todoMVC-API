const express   = require('express');
const router    = express.Router();
const todoRouter = require('./todos');

router.use('/api/todos', todoRouter);

router.get('/', (req, res) => res.send("You made it! Again!") );

module.exports = router;
