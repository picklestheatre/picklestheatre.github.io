$(".arrow").click(function() {
    var box = $(".box-inner"),
      x;
    if ($(this).hasClass("arrow-right")) {
      x = ((box.width() / 2)) + box.scrollLeft();
      box.animate({
        scrollLeft: x,
      })
    } else {
      x = ((box.width() / 2)) - box.scrollLeft();
      box.animate({
        scrollLeft: -x,
      })
    }
  })
  
  