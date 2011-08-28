module.exports = {
  index: function (req, res) {
    res.local('title', 'Github Activity');
    res.render('index');
  }
}
