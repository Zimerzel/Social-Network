const { Users } = require('../models');

const usersController = {
  // add comment to pizza
    addUser({ params, body }, res) {
        console.log(params);
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers({ params, body }, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends',select: '-__v'})
        .select('__v')
        .then(dbThoughtsData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },


    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .populate({path: 'friends',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({message: 'No users found with this id!'});
            return;
        }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    removeUsers({ params }, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },


    addFriend({params,body}, res) {
        Users.findOneAndUpdate({_id: params.thoughtId}, {$push: {friends: params.friendId}}, {new:true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
        if (!dbUsersData){
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports =usersController;