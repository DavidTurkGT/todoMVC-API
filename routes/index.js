const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => res.send("You made it! Again!") );

module.exports = router;
