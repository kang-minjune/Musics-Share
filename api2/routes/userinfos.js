import express from 'express';
import{
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/userinfosControllers.js';

const router = express.Router();

//유저 전체 조회
router.get('/', getAllUsers);
//유저 조회
router.get('/:id', getUser);
//유저 업데이트
router.put('/userupdate/:id', updateUser);
//유저 삭제
router.delete('/userdelete/:id', deleteUser);

export default router;