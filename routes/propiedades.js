import express from 'express';
const router = express.Router();
router.get('/myProperties', (req, res) => {
    if (req.cookies && req.cookies._token) {
        res.render('properties/myProperties'); 
        } else {
        res.redirect('/auth/login');
    }
});
export default router;