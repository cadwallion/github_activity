  var https = require('https');
  
  var Github = module.exports = {
    setAuthToken: function (token) { 
      this.access_token = token; 
    },
    send: function (path, callbk) {
      if (this.access_token != undefined) { 
          full_path = path + "?access_token=" + this.access_token;
      } else {
        full_path = path;
      }
      options = {
        host: 'api.github.com',
        path: full_path
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
    },

    getCommitsByRepo: function (repo, callbk) {
      if (typeof(repo) == 'string') {
        this.send('/repos/' + repo + '/commits', callbk);
      } else {
        console.log('ARRAY OF REPOS');
        var processed = 0, 
            total = repo.length,
            repoData = {},
            self = this;
         repo.forEach(function(r) {
            url = '/repos/' + r.replace("_","/") + '/commits';
            console.log('accessing url ' + url);
            self.send(url, function(data) { 
              repoData[r.replace("_","/")] = JSON.parse(data);
              console.log('REPO ' + r + 'added to data');
              processed = processed + 1;
              if (processed == total) { 
                console.log('repos processed, callback engaged');
                callbk(repoData);
              }
            });
         });
      }
    },

    getCommitCommentsByRepo: function (repo, callbk) {
      this.send('/repos/' + repo + '/comments', callbk);
    },

    getCommitCommentsBySha: function(sha, callbk) {
      this.send('/repos/' + repo + '/commits/' + sha + '/comments', callbk);
    },

    getWatchedRepos: function (callbk) { 
      if (this.access_token != undefined) {
        this.send('/user/watched', callbk);
      } else {
        return "Please authenticate first";
      }
    },
    
    getFollowing: function (callbk) {
      if (this.access_token != undefined) {
        this.send('/user/following', callbk);
      } else {
        return "Please authenticate first";
      }
    },

    getFollowers: function (callbk) {
      if (this.access_token != undefined) {
        this.send('/user/followers', callbk);
      } else {
        return "Please authenticate first";
      }
    }
  }
