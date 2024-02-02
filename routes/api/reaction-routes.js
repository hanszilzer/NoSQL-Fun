const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reaction-controller');

// /api/thoughts/:thoughtId/reactions
router.route('/').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
