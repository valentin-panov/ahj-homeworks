import CardValidator from './engine/cardValidator';

export default function app() {
  const cardValidator = new CardValidator();
  cardValidator.init();
}

app();
