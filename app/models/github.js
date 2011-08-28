  var https = require('https');
  
  var Github = module.exports = {
    setAuthToken: function (token) { 
      this.access_token = token; 
    },
    send: function (path, callbk) {
      if (this.access_token != undefined) {
        options = {
          host: 'api.github.com',
          path: path + "?access_token=" + this.access_token
        }
        https.get(options, function(res) {
          var buffer = '';
          res.on('data', function(d) {
            buffer += d;
          });

          res.on('end', function() { 
            callbk(buffer);
          });
        });
      } else {
        return "Please authenticate first."
      }
    },

    getCommitsByRepo: function (repo, callbk) {
      this.send('/repos/' + repo + '/commits', callbk);
    },

    getCommitCommentsByRepo: function (repo, callbk) {
      this.send('/repos/' + repo + '/comments', callbk);
    },

    getCommitCommentsBySha: function(sha, callbk) {
      this.send('/repos/' + repo + '/commits/' + sha + '/comments', callbk);
    },

    getWatchedRepos: function (callbk) { 
      this.send('/user/watched', callbk);
    },
    
    getFollowing: function (callbk) {
      this.send('/user/following', callbk);
    },

    getFollowers: function (callbk) {
      this.send('/user/followers', callbk);
    }
  }
