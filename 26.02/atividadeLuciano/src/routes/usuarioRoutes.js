const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', usuarioController.criar);
router.get('/usuarios', usuarioController.listar);
router.get('/usuarios/:id', usuarioController.buscar);
router.put('/usuarios/:id', usuarioController.atualizar);
router.delete('/usuarios/:id', usuarioController.remover);

module.exports = router;