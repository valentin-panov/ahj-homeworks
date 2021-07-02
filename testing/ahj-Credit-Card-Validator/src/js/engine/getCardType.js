/* eslint-disable prefer-destructuring */
import json from '../data/paySystemCodes.json';

export default function getCardType(number) {
  if (!number) {
    return false;
  }
  let cardType = true;
  Object.entries(json).forEach((element) => {
    // eslint-disable-next-line eqeqeq
    if (element[1].find((item) => item == number.substring(0, 2))) {
      cardType = element[0];
    }
  });
  return cardType;
}

// Credit Card Type	Credit Card Number
// American Express	371449635398431
// Diners Club	30569309025904
// Discover	6011111111111117
// JCB	3530111333300000
// MasterCard	5555555555554444
// Visa	4111111111111111

// Card length:

// Visa and Visa Electron: 13 or 16
// Mastercard: 16
// Discover: 16
// American Express: 15
// Diner's Club: 14 (including enRoute, International, Blanche)
// Maestro: 12 to 19 (multi-national Debit Card)
// Laser: 16 to 19 (Ireland Debit Card)
// Switch: 16, 18 or 19 (United Kingdom Debit Card)
// Solo: 16, 18 or 19 (United Kingdom Debit Card)
// JCB: 15 or 16 (Japan Credit Bureau)
// China UnionPay: 16 (People's Republic of China)
