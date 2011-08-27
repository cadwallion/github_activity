module.exports = {
  callback: function (req, res) { 
    this.consumer.getOAuthAccessToken(req.session.oauthRequestToken, 
      req.session.oauthRequestTokenSecret, req.query.oauth_verifier,
      function(err, token, secret, results) {
        if (error) {
          res.send("Error authenticating");
        } else {
          req.session.accessToken = token;
          req.session.accessTokenSecret = secret;
        }                   
      }
    )
  },
  connect: function (req, res) {
    this.consumer.getOAuthRequestToken(function(err, token, token_secret, results) {
      if (error) {
        res.send("Error getting OAuth access token");
      } else {
        req.session.requestToken = token;
        req.session.requestTokenSecret = secret;
        res.redirect("https://github.com/login/oauth/authorize?oauth_token=" + 
          req.session.requestToken);
      }
    })
  }
}
