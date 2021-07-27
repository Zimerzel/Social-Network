const {  Thoughts, Users } = require('../models');

const thoughtsController = {
  // add comment to pizza
  addThought({ params, body }, res) {
    console.log(params);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        console.log(dbThoughtsData);
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  getAllThoughts({ params, body }, res) {
    Thoughts.find({})
    .populate({path: 'reactions', select: '-__v'})
    .select('__v')
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
  },


  getThoughtsById({params}, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
      if(!dbThoughtsData) {
      res.status(404).json({message: 'No thoughts found with this id!'});
      return;
      }
      res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  updateThoughts({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({message: 'No thoughts found with this id!'});
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
  },

  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },


  addReaction({params,body}, res){
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new:true, runValidators:true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
      if (!dbThoughtsData){
        res.status(404).json({message: 'No thoughts found with this id!'});
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))
  },


  // remove reply
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate({_id: params.commentId },{ $pull: { replies: { replyId: params.replyId } } },{ new: true }
    )
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtsController;
