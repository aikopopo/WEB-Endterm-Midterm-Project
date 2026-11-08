// Сообщение плавно появляется и исчезает (fadeIn / fadeOut)
function showMessage(text) {
  $("#message").text(text).fadeIn(200).delay(1000).fadeOut(300);
}

// Кнопка MORE: показывает или скрывает описание
function setupMoreButtons() {
  $(".details-btn").on("click", function () {
    const card = $(this).closest(".card-item");  // идём вверх к карточке
    card.find(".item-desc").slideToggle(200);    // ищем описание внутри карточки
  });
}