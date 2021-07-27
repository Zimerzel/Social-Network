const { Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    toJSON: {
        virtuals: false,
        getters: false
    },
    id: false
    
})

const Users = model('Users', UsersSchema);

module.exports = Users;