const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reaction: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  username: {
    type: String,
    required: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 256
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 256,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
;

thoughtSchema.virtual('reactionCt').get(function 90 {
  return this.reaction.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = { Thought };