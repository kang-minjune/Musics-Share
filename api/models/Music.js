import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true,
    },
    artist: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
});

export default mongoose.model("Music", MusicSchema)