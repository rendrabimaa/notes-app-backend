require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const categories = require('./api/categories');
const NotesService = require('./services/postgres/NotesService');
const CategoriesService = require('./services/postgres/CategoriesService');
const NotesValidator = require('./validator/notes');
const CategoriesValidator = require('./validator/categories');

const init = async () => {
  const notesService = new NotesService();
  const categoriesService = new CategoriesService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: categories,
      options: {
        service: categoriesService,
        validator: CategoriesValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
