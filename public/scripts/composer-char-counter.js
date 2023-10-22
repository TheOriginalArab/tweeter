$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remainingChar = maxLength - currentLength;

    $(".counter").text(remainingChar);

    if (remainingChar < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
