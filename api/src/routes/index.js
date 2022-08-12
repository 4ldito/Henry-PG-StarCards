const { Router } = require('express');
const { testRoute } = require('./test');
const router = Router();

router.use('/test', testRoute);

module.exports = router;
