const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '@#$%&*()-+=^';
const LETTERS_LENGTH = 8;
const NUMBERS_LENGTH = 4;
const SYMBOLS_LENGTH = 4;

const generatedPassword = document.getElementById('generatedPassword');
const passwordGeneratorButton = document.getElementById('passwordGeneratorButton');
passwordGeneratorButton.addEventListener('click', generatePassword);

function generatePassword() {
  let newPassword = '';
  for (i = 0; i < LETTERS_LENGTH; i++) {
    newPassword += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }
  for (i = 0; i < NUMBERS_LENGTH; i++) {
    newPassword += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  }
  for (i = 0; i < SYMBOLS_LENGTH; i++) {
    newPassword += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
  }
  newPassword = newPassword.split('');
  for (i = newPassword.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = newPassword[i];
    newPassword[i] = newPassword[j];
    newPassword[j] = x;
  }
  newPassword = newPassword.join('');
  generatedPassword.innerHTML = newPassword;
}
