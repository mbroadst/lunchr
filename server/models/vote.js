var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var VoteSchema = new Schema({
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  score: { type: Number, default: 0 }
});

mongoose.model('Vote', VoteSchema);