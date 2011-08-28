module.exports = {
  index: function (req, res) {
    
    res.render('index', {
      title: 'Github Activity'  
    });
  }
}
