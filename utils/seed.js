const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const reaction = getRandomReaction();

    const username = getRandomName();
    const email = `${username}@yahoo.com`;

    users.push({
      username,
      email,
      reaction
    });
  }

  console.info('Seeding complete! 🌱');
  process.exit(0);
});