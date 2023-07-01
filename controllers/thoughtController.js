import { user, thoughts } from '../models'

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
    createThought({params, body }, res) {
      Thought.create(body)
        .then((thoughtData) => res.json(thoughtData))
          User.findOneAndUpdate({
            _id: params.userId},
            {$push: {thoughts: thoughtData._id}},
            {new: true}
          )
        })
        .catch((err) => res.status(400).json(err));
    },
  };
  deleteThought({ params }, res) {
    thoughts.findOneAndDelete({ _id: params.id })
    .then((thoughtData) => {
      if (!thoughtData) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
       return User.findOneAndUpdate(
        {_id: params.userId},
        {$pull: {thoughts: params.id}},
        {new: true}
       )
       })
       .then((userData)=> {if (!userData)) {
        return res.status(404).json({ message: 'No user found with this id!' });
       }
      })
      .catch((err) => res.status(400).json(err));
    }

      
