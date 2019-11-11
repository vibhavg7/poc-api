import { Router } from 'express';
import { getPosts, createPosts,getPost,deletePost,updatePost } from '../controllers/posts.controller';
const router = Router();

router.route('/')
    .get(getPosts)
    .post(createPosts);

router.route('/:postId')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);
    // .post(createPosts);
export default router;