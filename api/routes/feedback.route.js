import express from 'express';
import { createFeedback, deleteFeedback, updateFeedback, GetFeedback, GetAllFeedback , GetFeedbackUid, approvedFeedbacks } from '../controllers/feedback.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create' , verifyToken, createFeedback);
router.delete('/delete/:id', verifyToken, deleteFeedback);
router.post('/update/:id', verifyToken, updateFeedback);
router.get('/get/:id', GetFeedback);
router.get('/getUid/:id', GetFeedbackUid);
router.get('/get', GetAllFeedback);
router.get('/approvedFeedbacks', approvedFeedbacks);



export default router;