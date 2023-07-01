import { thoughts } from '../models'

const thoughtController = {
  getAllThoughts(req, res) {
      thoughts.find({})
      .populate({
          path: 'reations',
          select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
    .then(thoughtData => res.json(thoughtData))
    .catch(err => {
      res.status(400).json(err);
    })
  },
  getThoughtById({ params }, res) {
    thoughts
      .findOne({ _id: params.id })
      .populate({
        path: 'reations',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  updateThought({ params, body }, res) {
    thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then((thoughtData) => {
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thoughtData);
    })
    .catch((err) => { res.status(400).json(err); });
    },
  deleteThought({ params }, res) {
    thoughts.findOneAndDelete({ _id: params.id })
