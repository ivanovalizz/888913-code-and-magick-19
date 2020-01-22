'use strict';

var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGHT = 270; // Высота облака
var CLOUD_X = 100; // Координата облака по горизонтали
var CLOUD_Y = 10; // Координата облака по вертикали
var GAP = 10; // Отступ
var FONT_GAP = 50; // Отступ между колонками
var BAR_X;
var BAR_Y;
var BAR_WIDTH = 40; // Ширина колонки
var BAR_HEIGHT = 150; // Высота гистограммы максимальная
var barHeight; // Высота отдельного столбца

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 5);

  var maxTime = getMaxElement(times);

  // 1. Высота гистограммы = её максимального элемента - 150рх,
  // соответственно найти соотношение можно:
  //      MAX_BAR      BAR[I]
  //  ------------- = --------
  //    BAR_HEIGHT       X
  // Отсюда высота каждого столбца:
  // высота = BAR_HEIGHT * BAR[i] / maxTime
  // ширина = 40;
  //
  // 2. Чтобы расчитать координату Y для кажого столбца
  // у = высота текста + (150px - высота);

  for (var i = 0; i < names.length; i++) {
    barHeight = BAR_HEIGHT * times[i] / maxTime;
    BAR_X = (155 + FONT_GAP * i + BAR_WIDTH * i);
    BAR_Y = (CLOUD_Y + GAP * 8) + (BAR_HEIGHT - barHeight);

    ctx.fillText(Math.round(times[i]), BAR_X, BAR_Y - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(246, ' + (100 / i * 2) + '%, 36%)';
    }
    ctx.fillRect(BAR_X, BAR_Y, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], BAR_X, BAR_Y + barHeight + GAP * 2.5);
  }
};
