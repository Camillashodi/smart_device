import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  const textButton = document.querySelector('[data-text-btn]');
  const deskText = document.querySelector('[data-desk-text]');

  if (textButton && deskText) {
    textButton.classList.remove('is-open');
    deskText.classList.remove('is-open');

    textButton.addEventListener('click', function () {
      if (!deskText.classList.contains('is-open')) {
        deskText.classList.add('is-open');
        if (!textButton.classList.contains('is-open')) {
          textButton.classList.add('is-open');
          textButton.innerHTML = 'Свернуть';
        }
      } else {
        if (deskText.classList.contains('is-open')) {
          deskText.classList.remove('is-open');
          if (textButton.classList.contains('is-open')) {
            textButton.classList.remove('is-open');
            textButton.innerHTML = 'Подробнее';
          }
        }
      }
    });
  }

  const toggles = document.querySelectorAll('[data-toggle]');
  const footerContents = document.querySelectorAll('[data-footer-content]');

  if (toggles.length !== 0) {
    if (footerContents.length !== 0) {
      footerContents.forEach((content) => {
        content.classList.remove('no-js');
      });

      toggles.forEach((toggle) => {
        toggle.classList.remove('no-js');
      });
    }

    const removeClassIsOpen = (elements) => {
      elements.forEach((element) => {
        element.classList.remove('is-open');
      });
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', function () {
        if (!toggle.classList.contains('is-open')) {
          removeClassIsOpen(toggles);
          if (footerContents.length !== 0) {
            removeClassIsOpen(footerContents);
          }
          toggle.classList.add('is-open');

          footerContents.forEach((content) => {
            if (content.dataset.footerContent === toggle.dataset.toggle) {
              content.classList.add('is-open');
            }
          });
        } else {
          toggle.classList.remove('is-open');

          if (footerContents.length !== 0) {
            footerContents.forEach((content) => {
              if (content.dataset.footerContent === toggle.dataset.toggle) {
                content.classList.remove('is-open');
              }
            });
          }
        }
      });
    });
  }

  const inputs = document.querySelectorAll('[data-input-phone]');

  const prefixNumber = (str) => {
    if (str === '7') {
      return '7 (';
    }
    /*
    if (str === '8') {
      return '8 (';
    }*/
    if (str === '9') {
      return '7 (9';
    }
    return '7 (';
  };

  // ======================================
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const value = input.value.replace(/\D+/g, '');
      const numberLength = 11;

      let result;
      if (input.value.includes('+8') || input.value[0] === '8') {
        result = '';
      } else {
        result = '+';
      }

      //
      for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
          case 0:
            result += prefixNumber(value[i]);
            continue;
          case 4:
            result += ') ';
            break;
          case 7:
            result += '-';
            break;
          case 9:
            result += '-';
            break;
          default:
            break;
        }
        result += value[i];
      }
      //
      input.value = result;
    });
  });

  const modalButton = document.querySelector('[data-open-modal]');
  const inputName = document.querySelector('[data-input-name]');

  modalButton.addEventListener('click', function () {
    inputName.focus();
  });

  // ======================================


  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
