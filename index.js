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
  document.write('<meta name="viewport" content="width=' + widthM+ ', height=' + widthH + '">');
}




document.addEventListener('DOMContentLoaded', (event) => {
  Telegram.WebApp.ready();
  Telegram.WebApp.setBackgroundColor('#000000'); // Устанавливаем черный цвет рамки

  const user = Telegram.WebApp.initDataUnsafe.user;
  if (user) {
      console.log(`User ID: ${user.id}`);
  } else {
      console.log('Unable to get user information from Telegram WebApp.');
  }

  // Проверяем версию API
  const webAppVersion = Telegram.WebApp.version;
  console.log(`Web App API version: ${webAppVersion}`);

  function versionAtLeast(version) {
      const [major, minor] = version.split('.').map(Number);
      const [currentMajor, currentMinor] = webAppVersion.split('.').map(Number);
      return (currentMajor > major) || (currentMajor === major && currentMinor >= minor);
  }

  var isVerticalSwipesEnabled = true;
  function toggleVerticalSwipes(enable_swipes) {
      if (!versionAtLeast('7.7')) {
          console.warn('[Telegram.WebApp] Changing swipes behavior is not supported in version ' + webAppVersion);
          return;
      }
      isVerticalSwipesEnabled = !!enable_swipes;
      Telegram.WebApp.MainButton.web_app_setup_swipe_behavior({allow_vertical_swipe: isVerticalSwipesEnabled});
  }
  
  // Включаем вертикальные свайпы
  toggleVerticalSwipes(true);

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
