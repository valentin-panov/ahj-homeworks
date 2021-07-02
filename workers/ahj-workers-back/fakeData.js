const faker = require('faker');
const generateId = require('./idGenerator');

module.exports = () => {
  return {
    id: generateId(),
    header: faker.lorem.words(),
    logo: faker.random.image(),
    description: faker.lorem.paragraph(),
  };
};
