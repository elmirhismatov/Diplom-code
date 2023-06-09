

  // Получаем ссылки на элементы списка и кнопку
  var dropdown = document.querySelector(".dropdown");
  var dropdownContent = document.querySelector(".dropdown-content");
  var dropbtn = document.querySelector(".dropbtn");

  // Добавляем обработчик события для клика на кнопке
  dropbtn.addEventListener("click", function() {
    dropdownContent.classList.toggle("show");
  });

  // Добавляем обработчики событий для клика на элементах списка
  var dropdownItems = dropdownContent.querySelectorAll("a");
  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function() {
      // Запоминаем выбранное значение в localStorage
      localStorage.setItem("selectedValue", this.textContent);
      // Обновляем текст на кнопке
      dropbtn.textContent = this.textContent;
      // Скрываем выпадающее меню
      dropdownContent.classList.remove("show");
    });
  }

  // При загрузке страницы проверяем, есть ли сохраненное значение в localStorage
  if (localStorage.getItem("selectedValue")) {
    dropbtn.textContent = localStorage.getItem("selectedValue");
    window.addEventListener('beforeunload', function() {
      localStorage.removeItem('dropdown');
    });
  }
