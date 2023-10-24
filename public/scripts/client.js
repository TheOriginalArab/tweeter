/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
          <header>
            <div>
              <img src=${escape(tweet.user.avatars)} />
              <div>${escape(tweet.user.name)}</div>
            </div>
            <span>${escape(tweet.user.handle)}</span>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <span>${escape(timeago.format(tweet.created_at))}</span>
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
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $(".tweets-container").prepend($tweetElement);
    }
  };

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then((resolve, reject) =>
      renderTweets(resolve)
    );
  };

  //loadTweets();

  $("#tweet-form").submit(function (event) {
    //Prevent the default behavior of the form
    event.preventDefault();

    const tweetContent = $("#tweet-text").val();

    if (tweetContent.length > 140) {
      //alert("Tweet content is too long!");
      $("#error-message").text("Error! Tweet content is too long!").slideDown();
    }

    if (!tweetContent || tweetContent.trim() === "") {
      //alert("Tweet content cannot be empty!");
      $("#error-message")
        .text("Error! Tweet content cannot be empty!")
        .slideDown();
    }

    if (tweetContent.trim().length > 0 && tweetContent.trim().length < 140) {
      $.post({
        url: "/tweets",
        method: "POST",
        data: $("#tweet-form").serialize(),
      }).then((resolve, reject) => loadTweets());
    }

    $("#tweet-text").on("input", function () {
      //When user starts typing, hide error message.
      $("#error-message").slideUp();
    });
  });
});
