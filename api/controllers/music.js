import Music from '../models/Music.js';
import { ObjectId } from 'mongodb';
//장르로 리스트 찾는 코드
// export const getListGenre = async (req, res, next) => {
//     try {
//         console.log(req.params.id);
//         const genrename = req.params.id;
//         const Musiclist = await Music.find({
//             genre: genrename
//         });
//         res.status(200).json(Musiclist);
//     } catch (err) {
//         next(err);
//     }
// };


// 아이디로 리스트 찾는 코드
export const getListGenre = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const Musiclist = await Music.findById(
            req.params.id
        );
        res.status(200).json(Musiclist);
    } catch (err) {
        next(err);
    }
};

//모든 리스트 출력
export const getListGenres = async(req, res, next) => {
    const { min, max, limit ,...others } = req.query;
    try{
        const musics = await Music.find({
            ...others,
        }).limit(req.query.limit);
        res.status(200).json(musics);
    } catch(err){
        next(err);
    }
}

//리스트 추가
export const postListGenre = async (req, res, next) => {
    console.log(req.body);
    const newMusic = new Music(req.body);

    try{
        const savedMusic = await newMusic.save();
        console.log(savedMusic);
        res.status(200).json(savedMusic);
    } catch(err) {
        next(err);
    }
};

//리스트 수정
export const updateListGenre = async (req, res, next) => {
    try {
        // Extract the ID from the request body
        const musicId = await Music.findById(
            req.params.id
        );

        // Validate the ID format
        if (!ObjectId.isValid(musicId)) {
            return res.status(400).json({ message: "Invalid ID format", musicId });
        }

        // Update the music document in the database
        const updatedMusic = await Music.findByIdAndUpdate(
            musicId,
            {
                $set: {
                    artist: req.body.artist,
                    title: req.body.title,
                    genre: req.body.genre,
                    link: req.body.link
                }
            },
            { new: true, runValidators: true } // Return the updated document
        );

        // Check if the document was found and updated
        if (!updatedMusic) {
            return res.status(404).json({ message: "Music not found" });
        }

        // Log the updated information and send response
        console.log('Updated music document:', updatedMusic);
        res.status(200).json(updatedMusic);
    } catch (err) {
        // Log the error for debugging
        console.error('Error updating music document:', err);
        next(err);
    }
};

//음악 리스트 삭제
export const deleteListGenre = async (req, res, next) => {
    try{

        const musicId = await Music.findById(
            req.params.id
        );

        await Music.findByIdAndDelete(musicId);
        res.status(200).json("Music has been deleted.");
        
    } catch (err) {
        console.error('Error delete music document:', err);
        next(err);
    }
}