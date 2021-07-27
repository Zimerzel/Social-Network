const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtsById, 
    addThought, 
    updateThoughts,
    removeThoughts,
    addReaction,
    removeReaction

} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts);
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(removeThoughts); 
router.route('/:userId').post(addThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;