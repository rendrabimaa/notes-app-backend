const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: handler.getUserByMeHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
