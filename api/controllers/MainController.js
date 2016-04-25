/**
 * Created by francesco on 4/24/16.
 */
module.exports = {

  index: function(req, res) {
    res.view('index', { layout: 'layout' });
  },

  redirect: function (req, res) {
    Url.find({ id: req.param('id') }, function (err, result) {
      if(err) {
        res.send('Error!');
      } else {
        if(result.length > 0) {
          res.redirect(result[0].url);
        } else {
          res.send('Not found!');
        }
      }
    });
  },

  process: function (req, res) {
    var inputUrl = req.allParams().url;

    Url.find({ url: inputUrl }, function (err, result) {
      if(result.length > 0) {
        res.view('result', {
          url: result[0]
        });
      } else {
        Url.create({
          url: inputUrl,
          id: sails.shortid()
        }, function (err, createdUrl) {
          if(err) {
            res.send('Error!');
          } else {
            res.view('result', {
              url: createdUrl
            });
          }
        });
      }
    });
  }

};
