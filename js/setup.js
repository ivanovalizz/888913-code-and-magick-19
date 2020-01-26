'use strict';

var wizardCount = 4;
var firstNameArray = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNameArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];

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

document.querySelector('.setup').classList.remove('hidden');
renderWizards(wizardCount);
document.querySelector('.setup-similar-list').appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

