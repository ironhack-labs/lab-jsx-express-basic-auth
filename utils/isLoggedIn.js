function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        console.log('You are good to go!');
        next();
      }
      else {
        res.redirect('/auth/login')
      }
}

module.exports = isLoggedIn;