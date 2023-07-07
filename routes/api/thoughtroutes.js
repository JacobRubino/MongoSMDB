const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .delete(deleteThought);

router.route('/:id/:reactions')
  .post(createReaction);

router.route('/:id/:reactionId')
  .delete(deleteReaction);


module.exports = router;