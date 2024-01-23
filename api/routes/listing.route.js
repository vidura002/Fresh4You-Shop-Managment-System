import express from 'express';
import { createListing , deleteListings , updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListings);
router.post('/updates/:id', verifyToken, updateListing);

export default router;