const router = require('express').Router();

const sequelize = require('../config/connection');
const {User, Playlist} = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
            
        res.render('homepage', { 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {

      //  const playLists = await Playlist.findByPk(user_id = 1);
      //  const playlist = playLists.get({ plain: true }); 
      //  res.render('dashboard',{playlist});
       
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
        
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });

    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;