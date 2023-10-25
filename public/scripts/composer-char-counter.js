$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const maxLength = 140;
    const textArea = $(this);
    const currentLength = textArea.val().length;
    const remainingChar = maxLength - currentLength;

    const counter = textArea.parent().find(".counter");
    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
  });
});
