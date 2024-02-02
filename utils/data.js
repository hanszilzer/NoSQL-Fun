const { User, Thought, Reaction } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
  },
  // Add more user data as needed
];

const thoughtData = [
  {
    thoughtText: 'Thought 1',
    username: 'user1',
  },
  {
    thoughtText: 'Thought 2',
    username: 'user2',
  },
  // Add more thought data as needed
];

const reactionData = [
  {
    reactionBody: 'Reaction 1',
    username: 'user1',
  },
  {
    reactionBody: 'Reaction 2',
    username: 'user2',
  },
  // Add more reaction data as needed
];

const seedDatabase = async () => {
  await User.deleteMany();
  await Thought.deleteMany();
  await Reaction.deleteMany();

  const users = await User.insertMany(userData);
  const thoughts = await Thought.insertMany(
    thoughtData.map((thought) => ({ ...thought, userId: users[0]._id }))
  );

  await User.updateOne(
    { _id: users[0]._id },
    {
      $push: { thoughts: { $each: thoughts.map((thought) => thought._id) } },
    }
  );

  await Thought.updateOne(
    { _id: thoughts[0]._id },
    {
      $push: { reactions: reactionData.map((reaction) => new Reaction(reaction)) },
    }
  );

  console.log('Data seeded successfully!');
};

module.exports = seedDatabase;
