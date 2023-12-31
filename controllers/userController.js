const { User }= require('../models/index');
const { Thought } = require('../models/index');

const userController = {
  getAllUsers(req, res) {
    console.log('information:')
    User.find({})
      .populate([
        {
          path: 'thoughts',
          select: '-__v',
        },
        {
          path: 'friends',
          select: '-__v',
        },
      ])
      .select('-__v')
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log('error in usercontroller findall', err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        {
          path: 'thoughts',
          select: '-__v',
        },
        {
          path: 'friends',
          select: '-__v',
        },
      ])
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
        }
        return Thought.deleteMany({ username: userData.username });
      })
      .then(() => {
        res.status(200).json({ message: 'User and thoughts were deleted successfully'})
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController; 