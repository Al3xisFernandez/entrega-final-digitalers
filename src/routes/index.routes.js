const { Router } = require('express')
const router = Router();
const { rendeIndex, renderAbout, renderLogin, renderRegister } = require('../controllers/index.controllers')

router.get('/', rendeIndex

);
router.get('/about', renderAbout
);



module.exports = router;
