/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
    <header class="tweet-header">
    <img src=${tweet.user.avatars} />
    <div class="user-info">
    <div class="username">${tweet.user.name}</div>
    <div class="user-tag">${tweet.user.handle}</div>
    </div>
    </header>
    <p class="tweet-text">${tweet.content.text}</p>
    <footer>
    <span class="date template">${tweet.created_at}</span>
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
      $(".tweet-container").append($tweetElement);
    }
  };

  renderTweets(data);

  $("#tweet-form").submit(function (event) {
    //Prevent the default behavior of the form
    event.preventDefault();

    $.post({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    });
  });

  




});
