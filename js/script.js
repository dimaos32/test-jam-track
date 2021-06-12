const NUMBER_OF_MATCHES = 5;

const RE_LETTERS = /^[A-Za-zА-Яа-яЁё]{1}$/;

const DEFAULT_DICTIONARY = [
  'light',
  'lime',
  'slime',
  'ball',
  'Linx',
];

const addDashes = (num) => {
  num = String(num);

  let res = num[0];

  for (let i = 1; i < num.length; i++) {
    if (Number(num[i]) % 2 !== Number(num[i - 1]) % 2) {
      res += '-';
    }

    res += num[i];
  }

  return res;
};

const normalizeRequest = (request) => {
  let res = '';

  Array.from(request).filter((char) => {
    return RE_LETTERS.test(char);
  }).forEach((char) => {
    res += char;
  });

  return res;
}

const checkRequest = (request, dictionaryRecord) => {
  if (request.length > dictionaryRecord.length) {
    return false;
  }

  for (let i = 0; i < request.length; i++) {
    if (request[i] !== dictionaryRecord[i]) {
      return false;
    }
  }

  return true;
};

const autocomplite = (request, dictionary = DEFAULT_DICTIONARY) => {
  let res = [];

  if (!request.length) {
    return res;
  }

  normalizedRequest = normalizeRequest(request)

  for (let record of dictionary) {
    if (checkRequest(normalizedRequest.toLowerCase(), record.toLowerCase())) {
      res.push(record);

      if (res.length >= NUMBER_OF_MATCHES) {
        break;
      }
    }
  }

  if (!res.length) {
    return autocomplite(request.slice(0, -1), dictionary);
  }

  return res;
};

// Оформление интерактива на html страницы

// Задача 1

const addDashesInput = document.querySelector('#task1-input');
const addDashesOutput = document.querySelector('#task1-output');

addDashesInput.addEventListener('input', () => {
  addDashesInput.value = addDashesInput.value.replace (/[^\d]/g, '');
  addDashesOutput.textContent = addDashes(addDashesInput.value);
});

// Задача 2

const autocompliteDictionary = document.querySelector('#task2-dictionary');
const autocompliteRequest = document.querySelector('#task2-request');
const autocompliteOutput = document.querySelector('#task2-output');

let userDictionary = autocompliteDictionary.textContent.split(' ');

autocompliteDictionary.addEventListener('input', () => {
  userDictionary = autocompliteDictionary.value.split(' ');
  autocompliteOutput.textContent = autocomplite(autocompliteRequest.value, userDictionary);
});

autocompliteRequest.addEventListener('input', () => {
  autocompliteOutput.textContent = autocomplite(autocompliteRequest.value, userDictionary);
});
