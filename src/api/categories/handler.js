const ClientError = require('../../exceptions/ClientError');

class CategoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCategoryHandler = this.postCategoryHandler.bind(this);
    this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
    this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);
    this.putCategoryByIdHandler = this.putCategoryByIdHandler.bind(this);
    this.deleteCategoryByIdHandler = this.deleteCategoryByIdHandler.bind(this);
  }

  async postCategoryHandler(request, h) {
    try {
      this._validator.validateCategoryPayload(request.payload);
      const { name } = request.payload;
      const categoryId = await this._service.addCategory({ name });

      const response = h.response({
        status: 'success',
        message: 'Kategori berhasil ditambahkan',
        data: {
          categoryId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getCategoriesHandler() {
    const categories = await this._service.getCategories();
    return {
      status: 'success',
      data: {
        categories,
      },
    };
  }

  async getCategoryByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const category = await this._service.getCategoryById(id);

      return {
        status: 'success',
        data: {
          category,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putCategoryByIdHandler(request, h) {
    try {
      this._validator.validateCategoryPayload(request.payload);
      const { id } = request.params;
      await this._service.editCategoryById(id, request.payload);

      return {
        status: 'success',
        message: 'Kategori berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteCategoryByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteCategoryById(id);

      return {
        status: 'success',
        message: 'Kategori berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = CategoriesHandler;
