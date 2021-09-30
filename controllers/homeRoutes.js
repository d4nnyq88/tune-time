const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
            
        res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('login');
});

router.get('/dashboard', async (req, res) => {
    try {
            
        res.render('dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;