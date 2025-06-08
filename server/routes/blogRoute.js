import express from 'express';
import {
  addBlog,
  addComment,
  deleteBlogId,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRoute = express.Router();

blogRoute.post('/add', upload.single('image'), auth, addBlog);
blogRoute.get('/all', getAllBlogs);
blogRoute.get('/:blogId', getBlogById);
blogRoute.post('/delete', auth, deleteBlogId);
blogRoute.post('/toggle-publish', auth, togglePublish);
blogRoute.post('/add-comment', addComment);
blogRoute.post('/comments', getBlogComments);

blogRoute.post('/generate', auth, generateContent);

export default blogRoute;
