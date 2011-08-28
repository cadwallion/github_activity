module.exports = {
  index: function (req, res) {
    
    authData = {};

    authData.user = req.user;
    authData.loggedIn = req.loggedIn;

    if (req.session) {
      authData.auth = req.session.auth;
    }
    res.expose(authData, 'auth');

    res.render('index', {
      title: 'Github Activity'  
    });
  }
}
