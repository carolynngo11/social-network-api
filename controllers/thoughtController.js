const { Thought } = require("../models");

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Get thought by ID
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then( async (thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
          )
      },
    // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
};