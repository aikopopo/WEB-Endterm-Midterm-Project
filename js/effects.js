function showMessage(text) {
  $("#message").text(text).fadeIn(200).delay(1000).fadeOut(300);
}

function setupMoreButtons() {
  $(".details-btn").on("click", function () {
    const card = $(this).closest(".card-item");  
    card.find(".item-desc").slideToggle(200);    
  });
}

$(document).ready(function () {
  $("#featured-grid").on("mouseenter", ".card-item", function () {
    $(this).addClass("card-hover");
  });
  $("#featured-grid").on("mouseleave", ".card-item", function () {
    $(this).removeClass("card-hover");
  });
});
