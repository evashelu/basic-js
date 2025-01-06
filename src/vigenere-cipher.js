const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    message = message.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      if (alphabet.indexOf(messageChar) !== -1) {
        const messageCharIndex = alphabet.indexOf(messageChar);
        const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
        result += alphabet[(messageCharIndex + keyCharIndex) % 26];
        keyIndex++;
      } else {
        result += messageChar;
      }
    }

    return this.direct ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      if (alphabet.indexOf(encryptedChar) !== -1) {
        const encryptedCharIndex = alphabet.indexOf(encryptedChar);
        const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
        result += alphabet[(encryptedCharIndex - keyCharIndex + 26) % 26];
        keyIndex++;
      } else {
        result += encryptedChar;
      }
    }

    return this.direct ? result : result.split('').reverse().join('');
  }
}
module.exports = {
  VigenereCipheringMachine
};
