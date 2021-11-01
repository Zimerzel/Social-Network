const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    addUser,
    updateUsers,
    removeUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUsersById).put(updateUsers).delete(removeUsers);
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;