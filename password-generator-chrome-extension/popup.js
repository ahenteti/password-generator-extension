var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var NUMBERS = '0123456789';
var SYMBOLS = '@#$%&*()-+=^';

var generatedPassword = document.getElementById('generatedPassword');
var passwordGeneratorButton = document.getElementById('passwordGeneratorButton');
var lettersLengthInput = document.getElementById('lettersLengthInput');
var numbersLengthInput = document.getElementById('numbersLengthInput');
var symbolsLengthInput = document.getElementById('symbolsLengthInput');

passwordGeneratorButton.addEventListener('click', generatePassword);
lettersLengthInput.addEventListener('change', generatePassword);
numbersLengthInput.addEventListener('change', generatePassword);
symbolsLengthInput.addEventListener('change', generatePassword);

function generatePassword() {
  var newPassword = '';
  for (i = 0; i < lettersLengthInput.value; i++) {
    newPassword += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }
  for (i = 0; i < numbersLengthInput.value; i++) {
    newPassword += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  }
  for (i = 0; i < symbolsLengthInput.value; i++) {
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
