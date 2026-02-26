const pool = require('../database/connection');
const bcrypt = require('bcrypt');

class UsuarioService {

  async criarUsuario({ nome, email, senha }) {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    const emailExiste = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (emailExiste.rowCount > 0) {
      throw new Error('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email`,
      [nome, email, senhaHash]
    );

    return result.rows[0];
  }

  async listarUsuarios() {
    const result = await pool.query(
      'SELECT id, nome, email, created_at FROM usuarios'
    );
    return result.rows;
  }

  async buscarPorId(id) {
    const result = await pool.query(
      'SELECT id, nome, email, created_at FROM usuarios WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      throw new Error('Usuário não encontrado');
    }

    return result.rows[0];
  }

  async atualizarUsuario(id, { nome, email }) {
    const result = await pool.query(
      `UPDATE usuarios
       SET nome = $1, email = $2
       WHERE id = $3
       RETURNING id, nome, email`,
      [nome, email, id]
    );

    if (result.rowCount === 0) {
      throw new Error('Usuário não encontrado');
    }

    return result.rows[0];
  }

  async removerUsuario(id) {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      throw new Error('Usuário não encontrado');
    }
  }
}

module.exports = new UsuarioService();