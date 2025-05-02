import express from 'express';
import { identifyPoliticalPost } from '../controllers/identifyPoliticalPost.js';

const router = express.Router();

router.post('/identifyPoliticalPost', identifyPoliticalPost);

export default router;

