import drawWidget from './drawWidget';
import getCardType from './getCardType';
import checkCardNumber from './checkCardNumber';
import setInputFilter from './setInputFilter';
import fadeOut from './fadeOut';

export default class CardValidator {
  constructor() {
    drawWidget();
    this.cardNumberInput = document.getElementById('card_number');
    this.cardNumberInputForm = document.getElementById('input-card-form');
    this.cardNumberInputBtn = document.getElementById('submitform');
    this.cardSymbols = document.querySelectorAll('.card');
    this.success = document.querySelector('.success');
    this.failure = document.querySelector('.failure');
  }

  init() {
    setInputFilter(
      this.cardNumberInput,
      (value) => /^\d*$/.test(value) // Allow digits only
    );
    this.addInputListeners();
    this.cardNumberInput.focus();
  }

  addInputListeners() {
    this.cardNumberInput.addEventListener(
      'input',
      (event) => {
        event.preventDefault();
        this.activateCardSymbol(getCardType(this.cardNumberInput.value));
      },
      false
    );
    this.cardNumberInputForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        this.drawResult(checkCardNumber(this.cardNumberInput.value.trim()));
      },
      false
    );
    this.cardNumberInputBtn.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.drawResult(checkCardNumber(this.cardNumberInput.value.trim()));
      },
      false
    );
  }

  drawResult(result) {
    if (result) {
      fadeOut(this.success);
    } else {
      fadeOut(this.failure);
    }
  }

  activateCardSymbol(type) {
    if (!type) {
      this.cardSymbols.forEach((element) => {
        element.classList.remove('cdisabled');
      });
      return;
    }
    this.cardSymbols.forEach((element) => {
      element.classList.add('cdisabled');
      if (element.classList.contains(type)) {
        element.classList.remove('cdisabled');
      }
    });
  }
}
