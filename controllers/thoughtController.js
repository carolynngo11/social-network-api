const { Thought } = require("../models");

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Get single thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then( async (thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this ID!'})
                : res.json(thought)
          )
      },
    // Add a thought
    addThought(req, res) {
      Thought.add(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
    deleteThought(req, res){
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        
    .then((thoughts)=>
      !thoughts
        ? res.status(404).json({message: "No thought with this ID!"})
        : res.json({message: "Thought Deleted"})
      )
      .catch((err)=> res.status(500).json(err));
  },
  // Add a reaction
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
    )
    .then((reaction) =>
    !reaction
      ? res.status(404).json({ message: 'No reaction with this ID.'})
      : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { new: true }
    )
    .then((reaction) =>
    !reaction
      ? res.status(404).json({ message: 'No reaction with this ID.'})
      : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
}
};