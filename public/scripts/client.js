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
    <header class="tweet-header">
    <img src=${escape(tweet.user.avatars)} />
    <div class="user-info">
    <div class="username">${escape(tweet.user.name)}</div>
    <div class="user-tag">${escape(tweet.user.handle)}</div>
    </div>
    </header>
    <p class="tweet-text">${escape(tweet.content.text)}</p>
    <footer>
    <span class="date template">${escape(
      timeago.format(tweet.created_at)
    )}</span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
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

  loadTweets();

  $("#tweet-form").submit(function (event) {
    //Prevent the default behavior of the form
    event.preventDefault();

    const tweetContent = $("#tweet-text").val();

    if (tweetContent.length > 140) {
      alert("Tweet content is too long!");
    }

    if (!tweetContent || tweetContent.trim() === "") {
      alert("Tweet content cannot be empty!");
    }

    if (tweetContent.trim().length > 0 && tweetContent.trim().length < 140) {
      $.post({
        url: "/tweets",
        method: "POST",
        data: $("#tweet-form").serialize(),
      }).then((resolve, reject) => loadTweets());
    }
  });
});
