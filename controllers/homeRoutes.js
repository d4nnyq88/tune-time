const router = require('express').Router();

const { response } = require('express');
const sequelize = require('../config/connection');
const {User, Playlist} = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      if(!req.session.logged_in){
        res.render('homepage')
      } else{  
      const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
        
        const user = userData.get({ plain: true });
        res.render('homepage'
        , { 
            user,
            logged_in: req.session.logged_in 
        }
        );}
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {

       const playListsData = await Playlist.findAll({where: {
        user_id: req.session.user_id,
      },
    });
       const playlists = playListsData.map((playlist) => playlist.get({ plain: true }));
       
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{model:Playlist}],
        });
        
        const user = userData.get({ plain: true });
       
        res.render('dashboard', {
            user,
            logged_in: true,
            playlists
        });

    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/track', withAuth, async (req, res) => {
  try {

    const playListsData = await Playlist.findAll({where: {
    user_id: req.session.user_id,
    }});

    const playlists = playListsData.map((playlist) => playlist.get({ plain: true }));
     
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{model:Playlist}],
    });
      
    const user = userData.get({ plain: true });
    
    res.render('track', {
        user,
        logged_in: true,
        playlists
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