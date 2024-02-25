import express from 'express';
import { create,getPosts } from '../controllers/postController.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post('/create',verifyToken,create);
router.get('/getposts',getPosts)

export default router;