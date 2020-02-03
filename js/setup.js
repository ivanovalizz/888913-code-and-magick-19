'use strict';

var wizardCount = 4;
var firstNameArray = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNameArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColorArray = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var fragment = document.createDocumentFragment();

var wizardArray = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createNewWizard = function () {
  return {
    name: firstNameArray[getRandomInt(0, firstNameArray.length - 1)] + ' ' + secondNameArray[getRandomInt(0, secondNameArray.length - 1)],
    coatColor: coatColorArray[getRandomInt(0, coatColorArray.length - 1)],
    eyesColor: eyesColorArray[getRandomInt(0, eyesColorArray.length - 1)]
  };
};

var createDOMelement = function (wizard) {
  var element = template.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
};

var renderWizards = function (count) {
  for (var i = 0; i < count; i++) {
    var wizard = createNewWizard();
    wizardArray.push(wizard);
    fragment.appendChild(createDOMelement(wizard));
  }
};

renderWizards(wizardCount);
document.querySelector('.setup-similar-list').appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
var formSetup = document.querySelector('.setup-wizard-form');
var formSubmitButton = formSetup.querySelector('.setup-submit');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = formSetup.querySelector('.setup-close');
var userNameInput = formSetup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Открытие/Закрытие формы

setupOpenButton.addEventListener('click', function () {
  openPopup();
});

setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupCloseButton.addEventListener('click', function () {
  closePopup();
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// Валидация

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя ндолжно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать из 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Отправка формы
/*
formSubmitButton.addEventListener('click', function () {
  formSetup.submit();
});

formSubmitButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    formSetup.submit();
  }
});
*/
// Смена цветов

var index = 0;

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardEyesColorInput = formSetup.querySelector('input[name="eyes-color"]');
var wizardCoatColorInput = formSetup.querySelector('input[name="coat-color"]');

/*
setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = coatColorArray[index];
  index++;
  if (index === coatColorArray.length) {
    index = 0;
  }
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = eyesColorArray[index];
  index++;
  if (index === eyesColorArray.length) {
    index = 0;
  }
});
*/

setupWizardFireball.addEventListener('click', function () {
  setupWizardFireball.style.background = fireballColorArray[index];
  index++;
  if (index === fireballColorArray.length) {
    index = 0;
  }
});

var setupWizardPropertyHandler = function (prop, arr) {
  prop.addEventListener('click', function () {
    prop.style.fill = arr[index];
    if (prop === setupWizardCoat) {
      wizardCoatColorInput.value = arr[index];
    } else if (prop === setupWizardEyes) {
      wizardEyesColorInput.value = arr[index];
    }
    index++;
    if (index === arr.length) {
      index = 0;
    }
  });
};

setupWizardPropertyHandler(setupWizardCoat, coatColorArray);
setupWizardPropertyHandler(setupWizardEyes, eyesColorArray);
