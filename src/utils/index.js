/* eslint-disable camelcase */

const mapDBNotesToModel = ({
  id,
  title,
  cue,
  main,
  summary,
  created_at,
  updated_at,
  category_id,
}) => ({
  id,
  title,
  cue,
  main,
  summary,
  createdAt: created_at,
  updatedAt: updated_at,
  categoryId: category_id,
});

module.exports = { mapDBNotesToModel };
