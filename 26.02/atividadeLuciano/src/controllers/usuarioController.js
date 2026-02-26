const usuarioService = require('../services/usuarioService');

class UsuarioController {

  async criar(req, res) {
    try {
      const usuario = await usuarioService.criarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  }

  async buscar(req, res) {
    try {
      const usuario = await usuarioService.buscarPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const usuario = await usuarioService.atualizarUsuario(
        req.params.id,
        req.body
      );
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async remover(req, res) {
    try {
      await usuarioService.removerUsuario(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }
}

module.exports = new UsuarioController();