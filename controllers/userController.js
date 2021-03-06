const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Get user by ID
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'No user with this ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
      },
    // Create a user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this ID!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // Delete user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId})
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID.'})
        : Thought.deleteMany({ username: user.username })
      )
      .catch((err) => res.status(500).json(err));
  },
    // Add Friend
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user found with that ID.' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete Friend
    removeFriend(req, res) {
        User.findOneAndDelete(
          { _id: req.params.studentId },
          { $pull: { friend: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with this ID!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};