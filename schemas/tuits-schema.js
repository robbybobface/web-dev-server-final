import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    tuit: String,
    attachments: {
        video: String,
        image: String
    },
    postedBy: {
        username: {
            type: String,
            default: 'Jarrett'
        },

    },
    liked: {
        type: Boolean,
        default: false
    },
    disliked: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    handle: {
        type: String,
        default: 'robbybobface'
    },
    time: {
        type: Date,
        default: Date.now
    },
    stats: {
        comments: {
            type: Number,
            default: 0
        },
        retuits: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        }
    },
    logoImage: {
        type: String,
        default: 'https://pbs.twimg.com/profile_images/1502305122663157763/qbK0Ghl4_400x400.jpg'
    }
}, { collection: 'tuits' });
export default schema;
