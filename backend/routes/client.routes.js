const { Router } = require('express');
const clientController = require('../controllers/client.controllers'); 

const router = Router();

router.post('/register_client', clientController.register_client);
router.post('/login_client', clientController.login_client);

module.exports = router;