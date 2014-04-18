var express = require('express'),
    async = require('async'),
    votes = express.Router(),
    mongoose = require('mongoose'),
    Vote = mongoose.model('Vote');

function upsertVote(item, callback) {
  Vote.findOne({restaurant_id: item.restaurant_id}, function(error, vote) {
    if (!!error) {
      callback(error);
      return;
    }

    if (!vote)
      vote = new Vote();

    vote.name = item.name;
    vote.restaurant_id = item.restaurant_id;
    vote.score += item.score;
    vote.save(function(error) {
      if (!!error) {
        callback(error);
        return;
      }

      callback();
    });
  });
};

votes.post('/', function(req, res) {
  console.log(typeof req.body);

  async.each(req.body, upsertVote, function(error) {
    if (!!error) {
      console.log(error);
      res.json(error);
      return;
    }

    res.status(200);
    res.end();
  });
});

votes.get('/', function(req, res) {
  Vote.find({score: { '$gt': 0} }).sort('-score').exec(function (error, votes) {
    if (!!error)
      return res.json(error);

    var total = votes.reduce(function(left, right) {
        return {score: left.score + right.score};
    });

    res.json({
      votes: votes,
      total: total.score
    });
  });
});

votes.get('/:id', function(req, res) {
  res.json({action: "SHOW"});
});

module.exports = votes;
