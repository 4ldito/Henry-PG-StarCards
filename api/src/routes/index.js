const { Router } = require('express');
const { testRoute } = require('./test');
const { mercadopago } = require('./mercadopago.ts');
const router = Router();

router.use('/test', testRoute);
router.use('/mercadopago', mercadopago);

module.exports = router;
