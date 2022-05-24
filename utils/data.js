const names = [
    'Aaron',
    'Smith',
    'Zenith',
    'Brook',
    'Zion'
];

const reactionDescriptions = [
    'Great',
    'Nice',
    'Good',
    'Bad',
    'Terrible'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomReaction = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(reactionDescriptions)
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomReaction };