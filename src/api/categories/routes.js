const routes = (handler) => [
  {
    method: 'POST',
    path: '/categories',
    handler: handler.postCategoryHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategoriesHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    handler: handler.getCategoryByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handler.putCategoryByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handler.deleteCategoryByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
