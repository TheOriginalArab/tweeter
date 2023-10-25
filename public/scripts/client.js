/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("#tweet-form").on("submit", onSubmit);

  loadTweets();

  $("#tweet-text").on("input", function () {
    //When user starts typing, hide error message.
    $("#error-message").slideUp();
  });
});

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  let $tweet = `<article class="tweet">
        <header>
          <div>
            <img src=${tweet.user.avatars} />
            <div>${tweet.user.name}</div>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <p>${escapeText(tweet.content.text)}</p>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
  return $tweet;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepends it to the tweets container

  const container = $(".tweets-container").empty();

  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    container.prepend($tweetElement);
  }
};
const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((resolve, reject) =>
    renderTweets(resolve)
  );
};

const onSubmit = function (event) {
  //Prevent the default behavior of the form
  event.preventDefault();

  const form = $(this);

  const tweetContent = form.find("#tweet-text").val();

  //error handling for tweet exceeding expected length
  if (tweetContent.length > 140) {
    $("#error-message").text("Error! Tweet content is too long!").slideDown();
    return;
  }

  //error handling for tweet being empty
  if (!tweetContent || tweetContent.trim() === "") {
    $("#error-message")
      .text("Error! Tweet content cannot be empty!")
      .slideDown();
    return;
  }

  const data = $(this).serialize();
  $.post("/tweets", data).then(() => {
    loadTweets();
    $("#tweet-form")[0].reset();
    $(".counter").text("140");
  });
};
