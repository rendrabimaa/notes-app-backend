const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CategoriesService {
  constructor() {
    this._categories = [];
  }

  addCategory({ name }) {
    const id = nanoid(16);

    const newCategory = { name, id };

    this._categories.push(newCategory);

    const isSuccess = this._categories.filter((category) => category.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Kategori gagal ditambahkan');
    }

    return id;
  }

  getCategories() {
    return this._categories;
  }

  getCategoryById(id) {
    const category = this._categories.filter((n) => n.id === id)[0];
    if (!category) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return category;
  }

  editCategoryById(id, { name }) {
    const index = this._categories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui kategori. Id tidak ditemukan');
    }

    this._categories[index] = {
      ...this._categories[index],
      name,
    };
  }

  deleteCategoryById(id) {
    const index = this._categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._categories.splice(index, 1);
  }
}

module.exports = CategoriesService;
