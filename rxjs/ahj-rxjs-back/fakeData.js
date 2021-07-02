const faker = require('faker');
const generateId = require('./idGenerator');

module.exports = () => {
  return {
    id: generateId(),
    from: faker.internet.email(),
    subject: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    received: Date.now(),
  };
};
