var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var NUMBERS = '0123456789';
var SYMBOLS = '@#$%&*()-+=^';
var LETTERS_LENGTH_INITIAL_VALUE = 8;
var NUMBERS_LENGTH_INITIAL_VALUE = 4;
var SYMBOLS_LENGTH_INITIAL_VALUE = 4;
var COPY_PASSWORD_INITIAL_VALUE = true;

var generatedPassword = document.getElementById('generatedPassword');
var passwordGeneratorButton = document.getElementById('passwordGeneratorButton');
var copyPasswordButton = document.getElementById('copyPasswordButton');
var lettersLengthInput = document.getElementById('lettersLengthInput');
var numbersLengthInput = document.getElementById('numbersLengthInput');
var symbolsLengthInput = document.getElementById('symbolsLengthInput');
var copyPasswordCheckboxInput = document.getElementById('copyPasswordCheckboxInput');
var copiedToClipboardMessage = document.getElementById('copiedToClipboardMessage');
var copiedToClipboardMessageTimeout = null;

initLettersLengthInputValue();
initNumbersLengthInputValue();
initSymbolsLengthInputValue();
initCopyPasswordCheckboxInput();
passwordGeneratorButton.addEventListener('click', generatePassword);
copyPasswordButton.addEventListener('click', copyPassword);
lettersLengthInput.addEventListener('change', generatePassword);
lettersLengthInput.addEventListener('change', updateLettersLengthLocalStorageValue);
numbersLengthInput.addEventListener('change', generatePassword);
numbersLengthInput.addEventListener('change', updateNumbersLengthLocalStorageValue);
symbolsLengthInput.addEventListener('change', generatePassword);
symbolsLengthInput.addEventListener('change', updateSymbolsLengthLocalStorageValue);
copyPasswordCheckboxInput.addEventListener('change', updateCopyPasswordLocalStorageValue);
setTimeout(generatePassword, 100);

function generatePassword() {
  // code inspiration: https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript
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
  generatedPassword.innerText = newPassword;
  if (copyPasswordCheckboxInput.checked) copyPassword();
}

function copyPassword() {
  // code inspiration: https://stackoverflow.com/questions/49236100/copy-text-from-span-to-clipboard
  var tmpTextArea = document.createElement('textarea');
  tmpTextArea.value = generatedPassword.textContent;
  document.body.appendChild(tmpTextArea);
  tmpTextArea.select();
  document.execCommand('Copy');
  tmpTextArea.remove();
  copiedToClipboardMessage.classList.add('show');
  clearTimeout(copiedToClipboardMessageTimeout);
  copiedToClipboardMessageTimeout = setTimeout(function () {
    copiedToClipboardMessage.classList.remove('show');
  }, 2000);
}

function initLettersLengthInputValue() {
  browser.storage.local.get(['LETTERS_LENGTH_LOCAL_STORAGE_KEY'], function (result) {
    if (result.LETTERS_LENGTH_LOCAL_STORAGE_KEY) {
      lettersLengthInput.value = result.LETTERS_LENGTH_LOCAL_STORAGE_KEY;
    } else {
      lettersLengthInput.value = LETTERS_LENGTH_INITIAL_VALUE;
      updateLettersLengthLocalStorageValue();
    }
  });
}

function updateLettersLengthLocalStorageValue() {
  browser.storage.local.set({ LETTERS_LENGTH_LOCAL_STORAGE_KEY: lettersLengthInput.value });
}

function initNumbersLengthInputValue() {
  browser.storage.local.get(['NUMBERS_LENGTH_LOCAL_STORAGE_KEY'], function (result) {
    if (result.NUMBERS_LENGTH_LOCAL_STORAGE_KEY) {
      numbersLengthInput.value = result.NUMBERS_LENGTH_LOCAL_STORAGE_KEY;
    } else {
      numbersLengthInput.value = NUMBERS_LENGTH_INITIAL_VALUE;
      updateNumbersLengthLocalStorageValue();
    }
  });
}

function updateNumbersLengthLocalStorageValue() {
  browser.storage.local.set({ NUMBERS_LENGTH_LOCAL_STORAGE_KEY: numbersLengthInput.value });
}

function initSymbolsLengthInputValue() {
  browser.storage.local.get(['SYMBOLS_LENGTH_LOCAL_STORAGE_KEY'], function (result) {
    if (result.SYMBOLS_LENGTH_LOCAL_STORAGE_KEY) {
      symbolsLengthInput.value = result.SYMBOLS_LENGTH_LOCAL_STORAGE_KEY;
    } else {
      symbolsLengthInput.value = SYMBOLS_LENGTH_INITIAL_VALUE;
      updateSymbolsLengthLocalStorageValue();
    }
  });
}

function updateSymbolsLengthLocalStorageValue() {
  browser.storage.local.set({ SYMBOLS_LENGTH_LOCAL_STORAGE_KEY: symbolsLengthInput.value });
}

function initCopyPasswordCheckboxInput() {
  browser.storage.local.get(['COPY_PASSWORD_LOCAL_STORAGE_KEY'], function (result) {
    if (result) {
      copyPasswordCheckboxInput.checked = result.COPY_PASSWORD_LOCAL_STORAGE_KEY;
    } else {
      copyPasswordCheckboxInput.checked = COPY_PASSWORD_INITIAL_VALUE;
      updateCopyPasswordLocalStorageValue();
    }
  });
}

function updateCopyPasswordLocalStorageValue() {
  browser.storage.local.set({ COPY_PASSWORD_LOCAL_STORAGE_KEY: copyPasswordCheckboxInput.checked });
}
