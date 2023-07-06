const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .delete(deleteThought);

module.exports = router;