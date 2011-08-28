module.exports = {
  index: function (req, res) {
    sess = req.session; 
    console.log(sess);
    res.render('index', {
      title:      'Github Activity',  
    });
  }
}
