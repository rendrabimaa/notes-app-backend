const CategoriesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const categoriesHandler = new CategoriesHandler(service, validator);
    server.route(routes(categoriesHandler));
  },
};
