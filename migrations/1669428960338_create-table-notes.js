exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    cue: {
      type: 'TEXT[]',
      notNull: true,
    },
    main: {
      type: 'TEXT[]',
      notNull: true,
    },
    summary: {
      type: 'TEXT[]',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
    category_id: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('notes');
};
