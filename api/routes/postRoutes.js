import express from 'express';
import { create,getPosts,deletePost } from '../controllers/postController.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post('/create',verifyToken,create);
router.get('/getposts',getPosts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletePost);

export default router;