const autoBind = require('auto-bind');

class CategoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postCategoryHandler(request, h) {
    this._validator.validateCategoryPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const categoryId = await this._service.addCategory({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Kategori berhasil ditambahkan',
      data: {
        categoryId,
      },
    });
    response.code(201);
    return response;
  }

  async getCategoriesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { name } = request.query;
    const categories = await this._service.getCategories(name, credentialId);
    return {
      status: 'success',
      data: {
        categories,
      },
    };
  }

  async getCategoryByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyOwner(id, credentialId);

    const category = await this._service.getCategoryById(id, credentialId);
    const notes = await this._service.getNotesByCategoryId(id, credentialId);

    const notesInCategory = { ...category, notes };

    return {
      status: 'success',
      data: {
        category: notesInCategory,
      },
    };
  }

  async putCategoryByIdHandler(request) {
    this._validator.validateCategoryPayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyOwner(id, credentialId);
    await this._service.editCategoryById(id, request.payload);

    return {
      status: 'success',
      message: 'Kategori berhasil diperbarui',
    };
  }

  async deleteCategoryByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyOwner(id, credentialId);
    await this._service.deleteCategoryById(id);

    return {
      status: 'success',
      message: 'Kategori berhasil dihapus',
    };
  }
}

module.exports = CategoriesHandler;
