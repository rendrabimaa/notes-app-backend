/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CategoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCategory({ name }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO categories VALUES($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Kategori catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getCategories() {
    const result = await this._pool.query('SELECT * FROM categories');
    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Kategori catatan tidak ditemukan');
    }

    return result.rows[0];
  }

  async editCategoryById(id, { name }) {
    const query = {
      text: 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING id',
      values: [name, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui kategori. Id tidak ditemukan');
    }
  }

  async deleteCategoryById(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('kategori gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = CategoriesService;
