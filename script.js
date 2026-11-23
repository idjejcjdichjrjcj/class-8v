// Нам на информатике говорили, что надо оборачивать всё в функцию, чтобы переменные не конфликтовали
(function(){
  
  // Ищу все кнопки вкладок и сами панели (секции)
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('[data-panel]');
  
  // Ищу кнопку-бургер и само меню для телефона
  const burger = document.getElementById('burger');
  const tabsNav = document.getElementById('tabs');

  // Главная функция переключения вкладок
  function showTab(name){
    // 1. Даю класс "is-active" только нужной кнопке
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
    
    // 2. Показываю только нужную секцию (у которой id совпадает)
    panels.forEach(p => p.classList.toggle('is-active', p.id === name));
    
    // 3. Закрываю мобильное меню после клика
    tabsNav.classList.remove('is-open');
    
    // 4. Скроллю наверх
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Вешаю клик на верхние вкладки
  tabs.forEach(t => t.addEventListener('click', () => showTab(t.dataset.tab)));
  
  // Вешаю клик на карточки на главной (01, 02, 03, 04)
  document.querySelectorAll('[data-goto]').forEach(btn=>{
    btn.addEventListener('click', ()=> showTab(btn.dataset.goto));
  });

  // Мобильное меню (бургер)
  burger.addEventListener('click', () => tabsNav.classList.toggle('is-open'));

  // =====================================
  // ЛАЙТБОКС (УВЕЛИЧЕНИЕ КАРТИНОК)
  // =====================================
  const lightbox = document.getElementById('lightbox'); 
  const lightboxImg = document.getElementById('lightbox-img'); 
  
  document.querySelectorAll('.gallery__item').forEach(item=>{
    item.addEventListener('click', ()=>{
      lightboxImg.src = item.dataset.full; // Беру большую картинку
      lightbox.classList.add('is-open'); // Открываю окно
    });
  });

  // Клик по фону - закрываю лайтбокс
  lightbox.addEventListener('click', ()=> lightbox.classList.remove('is-open'));
  
})();