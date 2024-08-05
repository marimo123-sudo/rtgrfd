// index.js
// Проверяем, какая тема у пользователя и применяем соответствующие стили
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// Обработчик изменения темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? "dark" : "light";
  document.body.classList.toggle('dark-mode', e.matches);
});

if (window.devicePixelRatio !== 1) { // Костыль для определения иных устройств, с коэффициентом отличным от 1
  var dpt = window.devicePixelRatio;
  var widthM = window.screen.width * dpt;
  var widthH = window.screen.height * dpt;
  document.write('<meta name="viewport" content="width=' + widthM + ', height=' + widthH + '">');
}

document.addEventListener('DOMContentLoaded', (event) => {
  Telegram.WebApp.ready();
  Telegram.WebApp.setHeaderColor('#000000'); // Устанавливаем черный цвет рамки

  const user = Telegram.WebApp.initDataUnsafe.user;
  if (user) {
    console.log(`User ID: ${user.id}`);
  } else {
    console.log('Unable to get user information from Telegram WebApp.');
  }

  console.log(Telegram.WebApp.viewportHeight);

  // Функция для проверки версии Web App
  function versionAtLeast(version) {
    const [major, minor] = version.split('.').map(Number);
    const [currentMajor, currentMinor] = Telegram.WebApp.version.split('.').map(Number);
    return (currentMajor > major) || (currentMajor === major && currentMinor >= minor);
  }

  // Включаем вертикальные свайпы
  if (versionAtLeast('7.7')) {
    Telegram.WebApp.toggleVerticalSwipes(true);
  } else {
    console.warn(`Vertical swipes are not supported in version ${Telegram.WebApp.version}`);
  }

  // Запрещаем изменение масштаба через жесты на устройствах с сенсорным экраном
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, { passive: false });
});
