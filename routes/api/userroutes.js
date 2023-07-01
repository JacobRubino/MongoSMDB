const router = require('express').Router();
const {
        createUser,
        updateUser,
        deleteUser,
        addFriend,
} = require('../../controllers/userController');


router.route('/')
    .post(createUser);


//api/users
router.route('/:userId')
    .put(updateUser)
    .delete(deleteUser);


 //api/users
router.route('/:userId/friends/:friendId')
    .post(addFriend)

module.exports = router;