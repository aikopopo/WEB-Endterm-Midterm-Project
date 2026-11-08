function showMessage(text) {
  $("#message").text(text).fadeIn(200).delay(1000).fadeOut(300);
}

function setupMoreButtons() {
  $(".details-btn").on("click", function () {
    const card = $(this).closest(".card-item");  
    card.find(".item-desc").slideToggle(200);    
  });
}
