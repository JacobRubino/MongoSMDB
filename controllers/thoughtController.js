const { User, Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: `No thought found with this id!${params}` });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  createThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({message: 'Thought Deleted'});
      })
      .catch((err) => res.status(400).json(err));
  },
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteReaction({params},res) {
    thoughtController.findOneAndUpdate(
      { _id: params.id },
      {$pull: {reactions: {_id: params.reactionId}}},
      {new: True}
    )
    .then((thoughtData) => {
      if (!thoughtData) {
        return res.status(404).json({message: 'No thought was found with this id'})
      }
      res.json(thoughtData);
    })
    .catch((err) => res.status(400).json(err));
  }
};

module.exports = thoughtController;
      
