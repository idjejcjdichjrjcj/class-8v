// Привет! Это скрипт для нашего сайта. Тут написано, как всё работает.

// Функция, которая показывает нужную страницу и скрывает остальные
function showTab(name) {
  // Находим все кнопки меню и все страницы (разделы)
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('[data-panel]');
  
  // Проходимся по всем кнопкам и убираем класс "is-active" (активный), 
  // а потом добавляем его только нужной кнопке.
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute('data-tab') === name) {
      tabs[i].classList.add('is-active');
    } else {
      tabs[i].classList.remove('is-active');
    }
  }

  // То же самое делаем со страницами. Показываем только одну.
  for (var j = 0; j < panels.length; j++) {
    if (panels[j].id === name) {
      panels[j].classList.add('is-active');
    } else {
      panels[j].classList.remove('is-active');
    }
  }

  // Если мы на телефоне, то после клика меню должно закрыться
  document.getElementById('tabs').classList.remove('is-open');
  document.getElementById('burger').classList.remove('is-active');
  
  // Меняем адрес страницы (добавляем #home, #gallery и т.д.)
  location.hash = name;
  
  // Прокручиваем страницу наверх
  window.scrollTo(0, 0);
}

// Ждём, когда страница загрузится, и вешаем обработчики на кнопки меню
window.onload = function() {
  
  // 1. РАБОТА С МЕНЮ
  var tabButtons = document.querySelectorAll('.tab');
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].onclick = function() {
      var tabName = this.getAttribute('data-tab');
      showTab(tabName);
    };
  }

  // Кнопки в подвале и на главной странице (у которых data-goto)
  var gotoButtons = document.querySelectorAll('[data-goto]');
  for (var k = 0; k < gotoButtons.length; k++) {
    gotoButtons[k].onclick = function(event) {
      event.preventDefault(); // Чтобы страница не перезагружалась
      var tabName = this.getAttribute('data-goto');
      showTab(tabName);
    };
  }

  // Кнопка "Бургер" (для мобильных)
  document.getElementById('burger').onclick = function() {
    var menu = document.getElementById('tabs');
    menu.classList.toggle('is-open');
    this.classList.toggle('is-active');
  };

  // Если в адресе уже есть #gallery и т.д., сразу открываем эту вкладку
  var hash = window.location.hash.replace('#', '');
  if (hash) {
    showTab(hash);
  }

  // 2. РАБОТА С ГАЛЕРЕЕЙ (ЛАЙТБОКС)
  var galleryItems = document.querySelectorAll('.gallery__item');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCaption = document.getElementById('lightbox-caption');
  var lbCount = document.getElementById('lightbox-count');
  var currentPhotoIndex = 0;

  // Функция для показа фото
  function showPhoto(index) {
    // Если дошли до конца, начинаем сначала
    if (index >= galleryItems.length) currentPhotoIndex = 0;
    else if (index < 0) currentPhotoIndex = galleryItems.length - 1;
    else currentPhotoIndex = index;

    var item = galleryItems[currentPhotoIndex];
    lbImg.src = item.getAttribute('data-full');
    lbCaption.innerText = item.getAttribute('data-caption');
    lbCount.innerText = (currentPhotoIndex + 1) + ' / ' + galleryItems.length;
  }

  // Открываем лайтбокс при клике на фотку
  for (var p = 0; p < galleryItems.length; p++) {
    galleryItems[p].onclick = function() {
      // Находим номер фотки, на которую кликнули
      for (var q = 0; q < galleryItems.length; q++) {
        if (galleryItems[q] === this) {
          showPhoto(q);
        }
      }
      lightbox.classList.add('is-open');
    };
  }

  // Кнопка закрыть (крестик)
  document.getElementById('lb-close').onclick = function() {
    lightbox.classList.remove('is-open');
  };

  // Кнопки "Вперёд" и "Назад"
  document.getElementById('lb-prev').onclick = function() {
    showPhoto(currentPhotoIndex - 1);
  };
  document.getElementById('lb-next').onclick = function() {
    showPhoto(currentPhotoIndex + 1);
  };

  // Если кликнули на тёмный фон, закрываем
  lightbox.onclick = function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('is-open');
    }
  };

  // Управление стрелочками на клавиатуре
  document.onkeydown = function(e) {
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'Escape') lightbox.classList.remove('is-open');
      if (e.key === 'ArrowLeft') showPhoto(currentPhotoIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentPhotoIndex + 1);
    }
  };


  // 3. РАБОТА С ФОРМОЙ ОБРАТНОЙ СВЯЗИ
  var form = document.getElementById('contact-form');
  var statusText = document.getElementById('form-status');

  form.onsubmit = function(event) {
    event.preventDefault(); // Отменяем обычную отправку (перезагрузку)

    // Получаем данные из полей
    var name = form.elements['name'].value.trim();
    var contact = form.elements['contact'].value.trim();
    var topic = form.elements['topic'].value;
    var message = form.elements['message'].value.trim();

    // Очищаем старые ошибки (если были)
    statusText.className = 'form-status';
    statusText.innerHTML = '';

    // --- ПРОВЕРКА ПОЛЕЙ ---
    var errors = [];

    if (name.length < 2) {
      errors.push('Введите имя (хотя бы 2 буквы).');
    }

    if (contact === '') {
      errors.push('Укажите email или телефон.');
    } else if (contact.indexOf('@') !== -1) {
      // Если есть собака, проверяем как email
      if (contact.indexOf('.') === -1) {
        errors.push('Email какой-то неправильный.');
      }
    } else {
      // Если собаки нет, проверяем как телефон
      if (contact.length < 6) {
        errors.push('Телефон слишком короткий.');
      }
    }

    if (topic === '') {
      errors.push('Выберите тему.');
    }

    if (message.length < 10) {
      errors.push('Сообщение должно быть минимум 10 символов.');
    }

    // Если есть ошибки - показываем их красным и не отправляем
    if (errors.length > 0) {
      statusText.innerText = errors.join(' ');
      statusText.className = 'form-status is-error';
      return;
    }

    // --- ЕСЛИ ВСЁ ХОРОШО, ДЕЛАЕМ ВИД, ЧТО ОТПРАВЛЯЕМ ---
    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Отправка...';

    // Ждём 800 миллисекунд (0.8 секунды) и показываем галочку!
    setTimeout(function() {
      form.reset(); // Очищаем форму
      submitBtn.disabled = false;
      submitBtn.innerText = 'Отправить сообщение';
      
      // Вставляем зелёную галочку и текст (как просили на фото)
      statusText.innerHTML = '<span class="checkmark">✅</span> Спасибо! Ваше сообщение отправлено.';
      statusText.className = 'form-status is-ok';
    }, 800);
  };
};