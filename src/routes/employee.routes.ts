import { Router } from 'express';
import { validateEmployee } from '../controllers/employee.controller';
const router = Router();

// router.route('/')
    // .get(getPosts)
    // .post(createPosts);

router.route('/validate')
      .post(validateEmployee);

// router.route('/:postId')
    // .get(getPost)
    // .put(updatePost)
    // .delete(deletePost);
    // .post(createPosts);
export default router;