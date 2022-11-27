/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBNotesToModel } = require('../../utils');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class CategoriesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCategory({ name, owner }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Kategori catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getCategories(name, owner) {
    let query = '';
    if (name) {
      query = {
        text: 'SELECT * FROM categories WHERE LOWER(name) LIKE $1 AND owner = $2',
        values: [`%${name.toLowerCase()}%`, owner],
      };
    } else {
      query = {
        text: 'SELECT * FROM categories WHERE owner = $1',
        values: [owner],
      };
    }

    const result = await this._pool.query(query);
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

  async getNotesByCategoryId(id, title) {
    let query = '';
    if (title) {
      query = {
        text: 'SELECT * FROM notes WHERE LOWER(title) LIKE $1 AND "category_id" = $2',
        values: [`%${title.toLowerCase()}%`, id],
      };
    } else {
      query = {
        text: 'SELECT * FROM notes WHERE "category_id" = $1',
        values: [id],
      };
    }

    const result = await this._pool.query(query);
    return result.rows.map(mapDBNotesToModel);
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

  async verifyOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Resource yang Anda minta tidak ditemukan');
    }

    const category = result.rows[0];

    if (category.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = CategoriesService;
