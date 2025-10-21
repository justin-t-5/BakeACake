import express from 'express'
import {getCakes, createCake, updateCake, deleteCake, getCakeById} from '../controllers/cakes.js';

const router= express.Router();

router.get('/cakes', getCakes);
router.get('/cakes/:id', getCakeById);
router.post('/cakes', createCake);
router.patch('/cakes/:id', updateCake);
router.delete('/cakes/:id', deleteCake);

export default router
